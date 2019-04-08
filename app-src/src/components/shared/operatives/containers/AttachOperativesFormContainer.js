import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { convertArrToObj } from 'helpers/generic';

import { COMPANY_USER_ROLE_TYPES } from 'constants/companyAdmin/enums';
import addOperative from 'actions/companyAdmin/operatives/async/addOperative';
import fetchOperativesForDrawing from 'actions/companyAdmin/operatives/async/fetchOperativesForDrawing';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';

import AttachOperativesForm from '../presentational/AttachOperativeForm';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class AttachOperativesFormContainer extends Component {
    state = {
        companyUserID: '',
        serviceIDs: []
    };

    render() {
        const { companyUserID, serviceIDs } = this.state;
        const userOptions = this._getUserOptions();
        const serviceOptions = this._getServicesOptions();
        const { isFetching, error } = this.props;

        return (
            <BlockContainer isFetching={isFetching} error={error}>
                <AttachOperativesForm
                    users={Object.values(userOptions)}
                    selectedUser={userOptions[companyUserID]}
                    serviceOptions={serviceOptions}
                    checkedServices={serviceIDs}
                    handleChange={this.handleChange}
                    handleMultiselectChange={this.handleMultiselectChange}
                    handleSubmit={this.handleSubmit}
                />
            </BlockContainer>
        );
    }

    componentDidMount() {
        const {
            fetchOperativesForDrawing,
            isFetchingOperatives,
            fetchCompanyUsers
        } = this.props;
        fetchCompanyUsers();
        const { id } = this.props.match.params;
        if (!isFetchingOperatives) {
            fetchOperativesForDrawing(id);
        }
    }

    componentDidUpdate = prevProps => {
        const {
            success,
            history,
            hierarchyType,
            hierarchyID,
            drawingUserIDs,
            operativeUsers,
            isFetching
        } = this.props;

        if ((drawingUserIDs.length && operativeUsers.length) || !isFetching) {
            if (drawingUserIDs.length === operativeUsers.length) {
                history.replace(`/company/${hierarchyType}s/${hierarchyID}`);
            }
        }
        if (!prevProps.success && success) {
            history.replace(`/company/${hierarchyType}s/${hierarchyID}`);
        }
    };

    _getUserOptions = () => {
        const { drawingUserIDs, operativeUsers } = this.props;
        const options = operativeUsers
            .filter(user => !drawingUserIDs.includes(user.id))
            .map(({ id, userFirstName, userLastName }) => ({
                value: id,
                text: `${userFirstName} ${userLastName}`
            }));

        return convertArrToObj(options, 'value');
    };

    _getServicesOptions = () => {
        const { services, subscriptions } = this.props;
        return services.map(({ id, name }) => ({
            value: id,
            text: name,
            disabled: !subscriptions.includes(id)
        }));
    };

    handleChange = ({ target: { type, value, name, checked } }) => {
        this.setState({ [name]: type === 'checkbox' ? checked : value });
    };

    handleMultiselectChange = ({ target: { name, value } }) => {
        const checkedValues = this.state[name];
        const newValues = checkedValues.includes(value)
            ? checkedValues.filter(val => val !== value)
            : [...checkedValues, value];

        this.setState({ [name]: newValues });
    };

    handleSubmit = () => {
        const { companyUserID, serviceIDs } = this.state;
        const { hierarchyType, hierarchyID, addOperative } = this.props;

        const postBody = {
            companyUserID,
            serviceIDs
        };

        addOperative(hierarchyType, hierarchyID, postBody);
    };
}

const { OPERATIVE } = COMPANY_USER_ROLE_TYPES;
const mapStateToProps = (
    {
        companyAdmin: {
            companyUsersReducer: { users, isFetching, error },
            servicesReducer: { services },
            subscriptionsReducer: { subscriptions },
            operativesReducer: {
                operatives,
                isFetching: fetchingOps,
                postSuccess
            }
        }
    },
    { match: { params } }
) => ({
    hierarchyID: params.id,
    operativeUsers: Object.values(users).filter(
        ({ type }) => type === OPERATIVE
    ),
    services: Object.values(services),
    subscriptions: subscriptions.serviceIDs || [],
    isFetching: isFetching || fetchingOps,
    error,
    postSuccess,
    drawingUserIDs: Object.values(operatives).map(
        operative => operative.companyUserID
    )
});

const mapDispatchToProps = dispatch => ({
    addOperative: (hierarchyType, hierarchyID, postBody) => {
        dispatch(addOperative(hierarchyType, hierarchyID, postBody));
    },
    fetchOperativesForDrawing: id => {
        dispatch(fetchOperativesForDrawing(id));
    },
    fetchCompanyUsers: () => {
        dispatch(fetchCompanyUsers());
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AttachOperativesFormContainer)
);

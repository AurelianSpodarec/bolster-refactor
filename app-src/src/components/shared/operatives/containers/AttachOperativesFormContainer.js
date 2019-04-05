import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { convertArrToObj } from 'helpers/generic';

import { COMPANY_USER_ROLE_TYPES } from 'constants/companyAdmin/enums';

import AttachOperativesForm from '../presentational/AttachOperativeForm';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

import addOperative from 'actions/companyAdmin/operatives/async/addOperative';
import fetchOperativesForDrawing from 'actions/companyAdmin/operatives/async/fetchOperativesForDrawing';

class AttachOperativesFormContainer extends Component {
    state = {
        CompanyUserID: '',
        serviceIDs: []
    };

    render() {
        const { CompanyUserID, serviceIDs } = this.state;
        const userOptions = this._getUserOptions();
        const serviceOptions = this._getServicesOptions();

        return (
            <BlockContainer>
                <AttachOperativesForm
                    users={Object.values(userOptions)}
                    selectedUser={userOptions[CompanyUserID]}
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
        const { fetchOperativesForDrawing, isFetchingOperatives } = this.props;
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
            operativeIDs,
            users
        } = this.props;
        if (operativeIDs && users) {
            const operativeUsers = users.filter(
                user => user.type === COMPANY_USER_ROLE_TYPES.OPERATIVE
            );
            if (operativeIDs.length === operativeUsers.length) {
                history.replace(`/${hierarchyType}s/${hierarchyID}`);
            }
        }
        if (!prevProps.success && success) {
            history.replace(`/${hierarchyType}s/${hierarchyID}`);
        }
    };

    _getUserOptions = () => {
        const { operativeIDs } = this.props;
        const options = this.props.users
            .filter(
                user =>
                    user.type === COMPANY_USER_ROLE_TYPES.OPERATIVE &&
                    !operativeIDs.includes(user.id)
            )
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
        const { CompanyUserID, serviceIDs } = this.state;
        const { hierarchyType, hierarchyID, addOperative } = this.props;

        const postBody = {
            CompanyUserID: CompanyUserID,
            ServiceIDs: serviceIDs
        };

        addOperative(hierarchyType, hierarchyID, postBody);
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            companyUsersReducer,
            servicesReducer,
            subscriptionsReducer,
            operativesReducer
        }
    },
    { match }
) => ({
    users: Object.values(companyUsersReducer.users),
    services: Object.values(servicesReducer.services),
    subscriptions: subscriptionsReducer.subscriptions.serviceIDs || [],
    hierarchyID: match.params.id,
    isFetching: companyUsersReducer.isFetching,
    isFetchingOperatives: operativesReducer.isFetching,
    error: companyUsersReducer.error,
    success: operativesReducer.postSuccess,
    operativeIDs: Object.values(operativesReducer.operatives).map(
        operative => operative.companyUserID
    )
});

const mapDispatchToProps = dispatch => ({
    addOperative: (hierarchyType, hierarchyID, postBody) => {
        dispatch(addOperative(hierarchyType, hierarchyID, postBody));
    },
    fetchOperativesForDrawing: id => {
        dispatch(fetchOperativesForDrawing(id));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AttachOperativesFormContainer)
);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { convertArrToObj, updateObj } from 'helpers/generic';
import AttachOperativesForm from '../presentational/AttachOperativeForm';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class AttachOperativesFormContainer extends Component {
    state = {
        CompanyUserID: '',
        checkedServices: []
    };

    render() {
        const { CompanyUserID, checkedServices } = this.state;
        const userOptions = this._getUserOptions();
        const serviceOptions = this._getServicesOptions();

        return (
            <BlockContainer>
                <AttachOperativesForm
                    users={Object.values(userOptions)}
                    selectedUser={userOptions[CompanyUserID]}
                    serviceOptions={Object.values(serviceOptions)}
                    checkedServices={checkedServices}
                    handleChange={this.handleChange}
                    handleMultiselectChange={this.handleMultiselectChange}
                    handleSubmit={this.handleSubmit}
                />
            </BlockContainer>
        );
    }

    _getUserOptions = () => {
        const options = this.props.users.map(
            ({ id, userFirstName, userLastName }) => ({
                value: id,
                text: `${userFirstName} ${userLastName}`
            })
        );

        return convertArrToObj(options, 'value');
    };

    _getServicesOptions = () => {
        const { services, subscriptions } = this.props;
        const serviceOptions = services.map(({ id, name }) => ({
            value: id,
            text: name,
            disabled: false
            // disabled: subscriptions.includes(id)
        }));

        return convertArrToObj(serviceOptions, 'value');
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
        console.log('submitted');
    };
}

const mapStateToProps = ({
    companyAdmin: { companyUsersReducer, servicesReducer, subscriptionsReducer }
}) => ({
    users: Object.values(companyUsersReducer.users),
    services: Object.values(servicesReducer.services),
    subscriptions: subscriptionsReducer.subscriptions.serviceIDs || [],
    isFetching: companyUsersReducer.isFetching,
    error: companyUsersReducer.error
});

export default connect(mapStateToProps)(AttachOperativesFormContainer);

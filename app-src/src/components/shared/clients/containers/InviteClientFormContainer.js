import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import InviteClientForm from '../presentational/InviteClientForm';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import addClient from 'actions/companyAdmin/clients/async/addClient';

class InviteClientFormContainer extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        companyName: '',
        serviceIDs: []
    };

    render() {
        const { serviceIDs } = this.state;
        const serviceOptions = this._getServicesOptions();

        return (
            <BlockContainer>
                <InviteClientForm
                    {...this.state}
                    serviceOptions={serviceOptions}
                    checkedServices={serviceIDs}
                    handleChange={this.handleChange}
                    handleMultiselectChange={this.handleMultiselectChange}
                    handleSubmit={this.handleSubmit}
                />
            </BlockContainer>
        );
    }

    componentDidUpdate = prevProps => {
        const { success, history, hierarchyType, hierarchyID } = this.props;

        if (!prevProps.success && success) {
            history.replace(`/company/${hierarchyType}s/${hierarchyID}`);
        }
    };

    _getServicesOptions = () => {
        const { services, subscriptions } = this.props;
        return services.map(({ id, name }) => ({
            value: id,
            text: name,
            disabled: !subscriptions.includes(id)
        }));
    };

    handleMultiselect = (name, value) => {
        this.setState({ [name]: value });
    };

    handleChange = (name, value) => {
        this.setState({ [name]: value });
    };

    handleSubmit = () => {
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            companyName,
            serviceIDs
        } = this.state;
        const { hierarchyType, hierarchyID, addClient } = this.props;

        const postBody = {
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            PhoneNumber: phoneNumber,
            CompanyName: companyName,
            ServiceIDs: serviceIDs
        };

        addClient(hierarchyType, hierarchyID, postBody);
    };
}

const mapStateToProps = (
    { companyAdmin: { servicesReducer, subscriptionsReducer, clientsReducer } },
    { match }
) => ({
    services: Object.values(servicesReducer.services),
    subscriptions: subscriptionsReducer.subscriptions.serviceIDs || [],
    hierarchyID: match.params.id,
    success: clientsReducer.postSuccess
});

const mapDispatchToProps = dispatch => ({
    addClient: (hierarchyType, hierarchyID, postBody) => {
        dispatch(addClient(hierarchyType, hierarchyID, postBody));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(InviteClientFormContainer)
);

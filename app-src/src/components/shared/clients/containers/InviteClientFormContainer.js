import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import InviteClientForm from '../presentational/InviteClientForm';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import fetchCompaniesPermissions from 'actions/companyAdmin/companiesPermissions/async/fetchCompanyPermissions';
import addClient from 'actions/companyAdmin/clients/async/addClient';

class InviteClientFormContainer extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        companyName: '',
        serviceIDs: [],
    };

    render() {
        const { serviceIDs } = this.state;
        const serviceOptions = this._getServicesOptions();
        const showMoreServicesMesssage = serviceOptions.some(option => option.disabled === true);
        const showClientServicesMessage = serviceOptions.some(option => option.hideClientAccess);

        return (
            <BlockContainer>
                <InviteClientForm
                    {...this.state}
                    serviceOptions={this._getServicesOptions()}
                    checkedServices={serviceIDs}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    showMoreServicesMesssage={showMoreServicesMesssage}
                    showClientServicesMessage={showClientServicesMessage}
                />
            </BlockContainer>
        );
    }

    componentDidMount = () => {
        const { fetchCompaniesPermissions, hierarchyType, hierarchyID } = this.props;
        fetchCompaniesPermissions(hierarchyType, hierarchyID);
    };

    componentDidUpdate = prevProps => {
        const { success, history, hierarchyType, hierarchyID } = this.props;

        if (!prevProps.success && success) {
            history.replace(`/company/${hierarchyType}s/${hierarchyID}`);
        }
    };

    _getServicesOptions = () => {
        const { services, subscriptions, companiesPermissions, companyID } = this.props;
        const relevantPermissions = companiesPermissions.filter(
            perm => perm.companyID === companyID,
        );

        return services.map(({ id, name }) => {
            const hasSub = subscriptions.includes(id);
            // relevant service match or null, which implies all access
            const hasAccess = !!relevantPermissions.find(
                perm => perm.serviceID === id || perm.serviceID === null,
            );
            return {
                value: id,
                text: name,
                disabled: !(hasSub && hasAccess),
                hideClientAccess: !hasAccess,
            };
        });
    };

    handleChange = (name, value) => this.setState({ [name]: value });

    handleSubmit = () => {
        const { firstName, lastName, email, phoneNumber, companyName, serviceIDs } = this.state;
        const { hierarchyType, hierarchyID, addClient } = this.props;

        const postBody = {
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            PhoneNumber: phoneNumber,
            CompanyName: companyName,
            ServiceIDs: serviceIDs,
        };

        addClient(hierarchyType, hierarchyID, postBody);
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            servicesReducer,
            subscriptionsReducer,
            clientsReducer,
            companiesPermissionsReducer: { companiesPermissions },
        },
        shared: {
            decodeJWTReducer: {
                jwtData: { companyID },
            },
        },
    },
    { match },
) => ({
    services: Object.values(servicesReducer.services),
    subscriptions: subscriptionsReducer.subscriptions.serviceIDs || [],
    hierarchyID: match.params.id,
    success: clientsReducer.postSuccess,
    companiesPermissions: Object.values(companiesPermissions),
    companyID,
});

const mapDispatchToProps = { addClient, fetchCompaniesPermissions };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InviteClientFormContainer));

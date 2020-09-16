import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import InviteClientForm from '../presentational/InviteClientForm';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import fetchCompaniesPermissions from 'actions/companyAdmin/companiesPermissions/async/fetchCompanyPermissions';
import addClient from 'actions/companyAdmin/clients/async/addClient';
import fetchClientUsers from 'actions/companyAdmin/userManagement/async/fetchClientUsers';
import addManyClients from 'actions/companyAdmin/clients/async/addManyClients';
import { isEmpty } from 'helpers/generic';

class InviteClientFormContainer extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        companyName: '',
        serviceIDs: [],
        clients: [],
        userOptions: [],
        inviteNewClient: false,
    };
    render() {
        const { serviceIDs, inviteNewClient } = this.state;
        const serviceOptions = this._getServicesOptions();
        const showMoreServicesMesssage = serviceOptions.some(option => option.disabled === true);
        const showClientServicesMessage = serviceOptions.some(option => option.hideClientAccess);
        const { isFetching, clients } = this.props;
        const userOptions = this._getUserOptions();
        return (
            <BlockContainer isFetching={isFetching} isEmpty={isFetching}>
                <InviteClientForm
                    {...this.state}
                    inviteNewClient = {!userOptions.length || inviteNewClient}
                    serviceOptions={this._getServicesOptions()}
                    checkedServices={serviceIDs}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    showMoreServicesMesssage={showMoreServicesMesssage}
                    showClientServicesMessage={showClientServicesMessage}
                    userOptions={userOptions}
                />
            </BlockContainer>
        );
    }

    componentDidMount = () => {
        const { fetchCompaniesPermissions, hierarchyType, hierarchyID, fetchClientUsers } = this.props;
        fetchCompaniesPermissions(hierarchyType, hierarchyID);
        fetchClientUsers();
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

    _getUserOptions = () => {
        const { clients } = this.props;
        const options = Object.values(clients).map(
            ({ id, userFirstName, userLastName, userEmail, companyName }) => ({
                value: id,
                label: `${userFirstName} ${userLastName} <${companyName}> <${userEmail}>`,
            }),
        );

        const labels = options.map(({ label }) => label);

        return options.filter((item, index) => {
            return index === labels.indexOf(item.label);
        });
    };

    handleChange = (name, value) => this.setState({ [name]: value });

    handleSubmit = () => {
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            companyName,
            serviceIDs,
            inviteNewClient,
            clients: selectedClientIDs,
        } = this.state;
        const { hierarchyType, hierarchyID, addClient, clients, addManyClients } = this.props;

        if (inviteNewClient || !this._getUserOptions().length) {
            const postBody = {
                firstName,
                lastName,
                email,
                phoneNumber,
                companyName,
                serviceIDs,
            };
            addClient(hierarchyType, hierarchyID, postBody);
            
            return;
        }
        const postBody = {
            serviceIDs,
            clients: selectedClientIDs.map(id => {
                const client = clients[id];
                return {
                    email: client.userEmail,
                    companyName: client.companyName,
                };
            }),
        };
        addManyClients(hierarchyType, hierarchyID, postBody);
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
    clients: clientsReducer.clients,
    isFetching: clientsReducer.isFetching,
    companiesPermissions: Object.values(companiesPermissions),
    companyID,
});

const mapDispatchToProps = { addClient, fetchCompaniesPermissions, addManyClients, fetchClientUsers };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InviteClientFormContainer));

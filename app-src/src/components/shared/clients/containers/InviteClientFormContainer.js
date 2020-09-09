import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import InviteClientForm from '../presentational/InviteClientForm';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
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
        const { serviceIDs } = this.state;
        const showMoreServicesMesssage = this._getServicesOptions().some(
            option => option.disabled === true,
        );
        const { isFetching, clients } = this.props;
        return (
            <BlockContainer isFetching={isFetching} isEmpty={isEmpty(clients)}>
                <InviteClientForm
                    {...this.state}
                    serviceOptions={this._getServicesOptions()}
                    checkedServices={serviceIDs}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    showMoreServicesMesssage={showMoreServicesMesssage}
                    userOptions={this._getUserOptions()}
                />
            </BlockContainer>
        );
    }

    componentDidMount = () => {
        const { fetchClientUsers } = this.props;

        fetchClientUsers();
    };

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
            disabled: !subscriptions.includes(id),
        }));
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

        if (inviteNewClient) {
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
    { companyAdmin: { servicesReducer, subscriptionsReducer, clientsReducer } },
    { match },
) => ({
    services: Object.values(servicesReducer.services),
    subscriptions: subscriptionsReducer.subscriptions.serviceIDs || [],
    hierarchyID: match.params.id,
    success: clientsReducer.postSuccess,
    clients: clientsReducer.clients,
    isFetching: clientsReducer.isFetching,
});

const mapDispatchToProps = dispatch => ({
    addClient: (hierarchyType, hierarchyID, postBody) =>
        dispatch(addClient(hierarchyType, hierarchyID, postBody)),
    addManyClients: (hierarchyType, hierarchyID, postBody) =>
        dispatch(addManyClients(hierarchyType, hierarchyID, postBody)),
    fetchClientUsers: () => dispatch(fetchClientUsers()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InviteClientFormContainer));

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import addClient from 'actions/companyAdmin/clients/async/addClient';
import EditClientForm from '../presentational/EditClientForm';
import fetchClientsForDrawing from 'actions/companyAdmin/clients/async/fetchClientsForDrawing';

class EditClientFormContainer extends Component {
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
                <EditClientForm
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
    _setClientDetails = () => {
        const { client } = this.props;

        this.setState({
            firstName: client.userFirstName,
            lastName: client.userLastName,
            email: client.userEmail,
            phoneNumber: client.userPhoneNumber,
            companyName: client.companyName
            //Need to get service IDs from api
            // serviceIDs: []
        });
    };
    componentDidUpdate = prevProps => {
        const {
            success,
            history,
            hierarchyType,
            hierarchyID,
            client
        } = this.props;

        if (!prevProps.client.id && !!client.id) {
            this._setClientDetails();
        }

        if (!prevProps.success && success) {
            history.replace(`/${hierarchyType}s/${hierarchyID}`);
        }
    };

    componentDidMount = () => {
        const { hierarchyID, fetchClientsForDrawing, client } = this.props;

        fetchClientsForDrawing(hierarchyID);

        if (client.id) {
            this._setClientDetails();
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

    handleMultiselectChange = ({ target: { name, value } }) => {
        const checkedValues = this.state[name];
        const newValues = checkedValues.includes(value)
            ? checkedValues.filter(val => val !== value)
            : [...checkedValues, value];

        this.setState({ [name]: newValues });
    };

    handleChange = ({ target: { type, value, name, checked } }) => {
        this.setState({ [name]: type === 'checkbox' ? checked : value });
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
    client: clientsReducer.clients[match.params.clientID] || {},
    clientID: match.params.clientID,
    success: clientsReducer.postSuccess
});

const mapDispatchToProps = dispatch => ({
    addClient: (hierarchyType, hierarchyID, postBody) => {
        dispatch(addClient(hierarchyType, hierarchyID, postBody));
    },
    fetchClientsForDrawing: drawingID => {
        dispatch(fetchClientsForDrawing(drawingID));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(EditClientFormContainer)
);

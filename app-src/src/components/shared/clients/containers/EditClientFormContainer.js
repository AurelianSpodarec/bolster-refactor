import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import EditClientForm from '../presentational/EditClientForm';

import editClientForDrawing from 'actions/companyAdmin/clients/async/editClientForDrawing';

class EditClientFormContainer extends Component {
    state = {
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
                    handleMultiselectChange={this.handleMultiselectChange}
                    handleSubmit={this.handleSubmit}
                />
            </BlockContainer>
        );
    }
    _setClientDetails = () => {
        // * ID comes out of DB as number, but checkbox stores value as string
        const serviceIDs = this.props.client.serviceIDs.map(id => String(id));
        this.setState({
            serviceIDs
        });
    };
    componentDidUpdate = prevProps => {
        const { success, history, hierarchyID, client } = this.props;
        if (!prevProps.client.id && !!client.id) {
            this._setClientDetails();
        }

        if (!prevProps.success && success) {
            history.replace(`/company/drawings/${hierarchyID}`);
        }
    };

    componentDidMount = () => {
        const { client } = this.props;

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

    handleSubmit = () => {
        const { serviceIDs } = this.state;
        const { editClient, clientID } = this.props;

        const postBody = {
            ServiceIDs: serviceIDs
        };

        editClient(clientID, postBody);
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
    editClient: (drawingID, postBody) => {
        dispatch(editClientForDrawing(drawingID, postBody));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(EditClientFormContainer)
);

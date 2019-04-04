import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import editClientForDrawing from 'actions/companyAdmin/clients/async/editClientForDrawing';
import fetchClientsForDrawing from 'actions/companyAdmin/clients/async/fetchClientsForDrawing';
import ClientEdit from '../presentational/ClientEdit';

class ClientEditContainer extends Component {
    state = {
        firstName: '',
        lastName: ''
    };

    render() {
        return <ClientEdit {...this.state} />;
    }
    _setClientDetails = () => {
        const { client } = this.props;

        this.setState({
            firstName: client.userFirstName,
            lastName: client.userLastName
        });
    };
    componentDidUpdate = prevProps => {
        const { client } = this.props;

        if (!prevProps.client.id && !!client.id) {
            this._setClientDetails();
        }
    };

    componentDidMount = () => {
        const { drawingID, fetchClientsForDrawing, client } = this.props;

        fetchClientsForDrawing(drawingID);

        if (client.id) {
            this._setClientDetails();
        }
    };
}

const mapStateToProps = ({ companyAdmin: { clientsReducer } }, { match }) => ({
    drawingID: match.params.id,
    client: clientsReducer.clients[match.params.clientID] || {},
    clientID: match.params.clientID
});

const mapDispatchToProps = dispatch => ({
    editClient: (drawingID, postBody) => {
        dispatch(editClientForDrawing(drawingID, postBody));
    },
    fetchClientsForDrawing: drawingID => {
        dispatch(fetchClientsForDrawing(drawingID));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(ClientEditContainer)
);

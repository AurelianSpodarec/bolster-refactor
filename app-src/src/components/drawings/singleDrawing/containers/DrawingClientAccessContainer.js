import React, { Component } from 'react';
import { connect } from 'react-redux';

import ClientsTable from 'components/shared/clients/presentational/ClientsTable';

import fetchClients from 'actions/clients/async/fetchClients';

class DrawingClientAccessContainer extends Component {
    render() {
        const { props } = this;

        return (
            <ClientsTable
                clients={props.clients}
                isFetching={props.isFetching}
                error={props.error}
            />
        );
    }

    componentDidMount = () => {
        this.props.fetchClients();
    };
}

const mapStateToProps = ({ clientsReducer }) => ({
    clients: Object.values(clientsReducer.clients),
    isFetching: clientsReducer.isFetching,
    error: clientsReducer.error
});

const mapDispatchToProps = dispatch => ({
    fetchClients: () => {
        dispatch(fetchClients());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DrawingClientAccessContainer);

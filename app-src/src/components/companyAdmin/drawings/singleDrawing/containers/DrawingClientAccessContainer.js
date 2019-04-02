import React, { Component } from 'react';
import { connect } from 'react-redux';

import ClientsTable from 'components/shared/clients/presentational/ClientsTable';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class DrawingClientAccessContainer extends Component {
    render() {
        const { props } = this;

        return (
            <BlockContainer>
                <ClientsTable
                    clients={props.clients}
                    isFetching={props.isFetching}
                    error={props.error}
                />
            </BlockContainer>
        );
    }
}

const mapStateToProps = ({ clientsReducer }) => ({
    clients: Object.values(clientsReducer.clients),
    isFetching: clientsReducer.isFetching,
    error: clientsReducer.error
});

export default connect(mapStateToProps)(DrawingClientAccessContainer);

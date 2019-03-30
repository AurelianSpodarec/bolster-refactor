import React, { Component } from 'react';
import { connect } from 'react-redux';
import ClientInvite from 'components/shared/clients/presentational/ClientInvite';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

// import ClientsTable from 'components/shared/clients/presentational/ClientsTable';

class BuildingClientInviteContainer extends Component {
    render() {
        const {props} = this;
        return (
            <BlockContainer error={props.error}>
           <ClientInvite
                clients={props.clients}
                isFetching={props.isFetching}
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

export default connect(mapStateToProps)(BuildingClientInviteContainer);

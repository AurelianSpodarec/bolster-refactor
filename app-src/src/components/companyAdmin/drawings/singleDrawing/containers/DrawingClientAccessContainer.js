import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ClientsTable from 'components/shared/clients/presentational/ClientsTable';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

import {
    DELETE_CLIENT_FROM_DRAWING,
    DELETION_ERROR
} from 'constants/shared/modalTypes';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';

class DrawingClientAccessContainer extends Component {
    render() {
        const { props } = this;

        return (
            <BlockContainer>
                <ClientsTable
                    clients={props.clients}
                    isFetching={props.isFetching}
                    error={props.error}
                    handleShowModal={this.handleShowModal}
                />
            </BlockContainer>
        );
    }

    handleShowModal = clientID => {
        const { showModal } = this.props;
        showModal(DELETE_CLIENT_FROM_DRAWING, { clientID });
    };

    componentDidUpdate(prevProps) {
        const { deletionError, showModal } = this.props;
        if (deletionError && !prevProps.deletionError) {
            showModal(DELETION_ERROR, {
                title: 'Deletion Error:',
                message:
                    'An error occurred while deleting this client, please try again later'
            });
        }
    }
}

const mapStateToProps = ({ companyAdmin: { clientsReducer } }) => ({
    clients: Object.values(clientsReducer.clients) || [],
    isFetching: clientsReducer.isFetching,
    error: clientsReducer.error,
    deletionError: clientsReducer.deletionError
});

const mapDispatchToProps = dispatch => ({
    showModal: (modalType, modalProps) => {
        dispatch(showModal(modalType, modalProps));
    }
});
export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(DrawingClientAccessContainer)
);

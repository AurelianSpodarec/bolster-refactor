import React, { Component } from 'react';
import { connect } from 'react-redux';

import TransferRequestListItem from '../presentational/TransferRequestListItem';
import deleteTransferRequest from 'actions/companyAdmin/transferRequests/async/deleteTransferRequest';
import respondToTransferRequest from 'actions/companyAdmin/transferRequests/async/respondToTransferRequest';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { CONFIRM_SUBMIT, CONFIRM_DELETE } from 'constants/shared/modalTypes';

class TransferRequestListItemContainer extends Component {
    render() {
        const { id, request } = this.props;
        console.log(id, request);
        return (
            <TransferRequestListItem
                request={request}
                companyID={id}
                handleAccept={this.handleAcceptModal}
                handleDecline={this.handleDeclineModal}
            />
        );
    }

    handleAcceptModal = () => {
        const {
            id,
            request,
            respondToTransferRequest,
            showModal,
            hideModal
        } = this.props;
        if (id === request.inviteToCompanyID) {
            const handleSubmit = () => {
                respondToTransferRequest(request.id, { isAccepting: true });
                hideModal();
            };
            const message =
                '##Are you sure you want to accept this transfer ownership request?##';
            showModal(CONFIRM_SUBMIT, { hideModal, handleSubmit, message });
        }
    };

    handleDeclineModal = () => {
        const {
            id,
            request,
            respondToTransferRequest,
            deleteTransferRequest,
            showModal,
            hideModal
        } = this.props;
        if (id === request.inviteToCompanyID) {
            const handleSubmit = () => {
                respondToTransferRequest(request.id, { isAccepting: true });
                hideModal();
            };
            const message =
                '##Are you sure you want to decline this transfer ownership request?##';
            showModal(CONFIRM_SUBMIT, { hideModal, handleSubmit, message });
        } else {
            const handleDelete = () => {
                deleteTransferRequest(request.id);
                hideModal();
            };
            const message =
                '##Are you sure you want to delete this transfer ownership request?##';
            showModal(CONFIRM_DELETE, { hideModal, handleDelete, message });
        }
    };
}

const mapStateToProps = ({
    companyAdmin: {
        companySettingsReducer: {
            companySettings: { id }
        }
    }
}) => ({
    id
});

const mapDispatchToProps = dispatch => ({
    deleteTransferRequest: id => dispatch(deleteTransferRequest(id)),
    respondToTransferRequest: (id, body) =>
        dispatch(respondToTransferRequest(id, body)),
    showModal: (type, props) => dispatch(showModal(type, props)),
    hideModal: () => dispatch(hideModal())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TransferRequestListItemContainer);

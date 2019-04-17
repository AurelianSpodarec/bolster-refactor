import React from 'react';
import { connect } from 'react-redux';

import PendingInvitesListItem from '../presentational/PendingInvitesListItem';
import acceptPendingInvite from 'actions/companyAdmin/pendingInvites/acceptPendingInvite';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { CONFIRM_SUBMIT } from 'constants/shared/modalTypes';

const PendingInvitesListItemContainer = ({
    invite,
    companyID,
    acceptPendingInvite,
    showModal,
    hideModal
}) => {
    return (
        <PendingInvitesListItem
            invite={invite}
            companyID={companyID}
            handleAccept={acceptInviteModal}
        />
    );

    function acceptInviteModal() {
        const handleSubmit = () => {
            acceptPendingInvite({ inviteID: invite.id });
            hideModal();
        };
        const message = 'Are you sure you wish to accept this invite?';
        showModal(CONFIRM_SUBMIT, { hideModal, handleSubmit, message });
    }
};

const mapStateToProps = ({
    companyAdmin: {
        companySettingsReducer: {
            companySettings: { id }
        }
    }
}) => ({
    companyID: id
});

const mapDispatchToProps = dispatch => ({
    acceptPendingInvite: postbody => dispatch(acceptPendingInvite(postbody)),
    showModal: (type, props) => dispatch(showModal(type, props)),
    hideModal: () => dispatch(hideModal())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PendingInvitesListItemContainer);

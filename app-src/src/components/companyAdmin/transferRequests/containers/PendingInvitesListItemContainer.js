import React from 'react';
import { connect } from 'react-redux';

import PendingInvitesListItem from '../presentational/PendingInvitesListItem';
import acceptPendingInvite from 'actions/companyAdmin/pendingInvites/acceptPendingInvite';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { CONFIRM_SUBMIT, CONFIRM_DELETE } from 'constants/shared/modalTypes';

const PendingInvitesListItemContainer = ({
    invite,
    acceptPendingInvite,
    showModal,
    hideModal,
    isIncoming
}) => {
    const { siteName, buildingName, floorName, drawingName } = invite;
    const name = [siteName, buildingName, floorName, drawingName]
        .filter(notNull => notNull)
        .join(' / ');
    return (
        <PendingInvitesListItem
            invite={invite}
            isIncoming={isIncoming}
            handleAccept={handleAcceptModal}
            handleDecline={handleDeclineModal}
            name={name}
        />
    );

    function handleAcceptModal() {
        const handleSubmit = () => {
            acceptPendingInvite({ inviteID: invite.id });
            hideModal();
        };
        const message = 'Are you sure you wish to accept this invite?';
        showModal(CONFIRM_SUBMIT, { hideModal, handleSubmit, message });
    }

    function handleDeclineModal() {
        const { hideModal, isIncoming } = this.props;
        const message = `Are you sure you wish to ${
            isIncoming ? 'decline' : 'delete'
        } this invitation?`;
        const handleDelete = () => {
            if (isIncoming) console.log('incoming');
            // decline
            else console.log('outgoing'); // delete
            hideModal();
        };
        showModal(CONFIRM_DELETE, { message, handleDelete, hideModal });
    }
};

const mapStateToProps = (
    {
        companyAdmin: {
            companySettingsReducer: {
                companySettings: { id }
            }
        }
    },
    { invite: { companyID } }
) => ({
    isIncoming: companyID === id
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

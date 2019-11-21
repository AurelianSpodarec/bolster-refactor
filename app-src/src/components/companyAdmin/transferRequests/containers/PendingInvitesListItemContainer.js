import React from 'react';
import { connect } from 'react-redux';

import PendingInvitesListItem from '../presentational/PendingInvitesListItem';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { CONFIRM_SUBMIT, CONFIRM_DELETE } from 'constants/shared/modalTypes';
import respondToPendingInvite from 'actions/companyAdmin/pendingInvites/respondToPendingInvite';
import deleteOutgoingInvite from 'actions/companyAdmin/pendingInvites/deleteOutgoingInvite';

const PendingInvitesListItemContainer = ({
    invite: { id: inviteID, ...invite },
    respondToPendingInvite,
    deleteOutgoingInvite,
    showModal,
    hideModal,
    isIncoming,
    headers,
    onMobile,
    services
}) => {
    const {
        siteName,
        buildingName,
        floorName,
        drawingName,
    } = invite;
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
            headers={headers}
            onMobile={onMobile}
            serviceName={getServiceName()}
        />
    );

    function getServiceName() {
        return services.filter(service => service.id === invite.serviceID)[0]
            .name;
    }

    function handleAcceptModal() {
        const handleSubmit = () => {
            const postBody = { inviteID, isAccepted: true };
            respondToPendingInvite(postBody);
            hideModal();
        };
        const message = 'Are you sure you wish to accept this invite?';
        showModal(CONFIRM_SUBMIT, { hideModal, handleSubmit, message });
    }

    function handleDeclineModal() {
        const message = `Are you sure you wish to ${
            isIncoming ? 'decline' : 'delete'
        } this invitation?`;

        const handleDelete = () => {
            if (isIncoming) {
                const postBody = { inviteID, isAccepted: false };
                respondToPendingInvite(postBody);
            } else {
                deleteOutgoingInvite(inviteID);
            }
            hideModal();
        };
        showModal(CONFIRM_DELETE, {
            message,
            handleDelete,
            hideModal,
            isIncoming
        });
    }
};

const mapStateToProps = (
    {
        companyAdmin: {
            servicesReducer: { services },
            companySettingsReducer: {
                companySettings: { id }
            }
        },
        shared: {
            mobileReducer: { onMobile }
        }
    },
    { invite: { companyID } }
) => ({
    isIncoming: companyID === id,
    onMobile,
    services: Object.values(services)
});

const mapDispatchToProps = dispatch => ({
    respondToPendingInvite: postbody =>
        dispatch(respondToPendingInvite(postbody)),
    deleteOutgoingInvite: id => dispatch(deleteOutgoingInvite(id)),
    showModal: (type, props) => dispatch(showModal(type, props)),
    hideModal: () => dispatch(hideModal())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PendingInvitesListItemContainer);

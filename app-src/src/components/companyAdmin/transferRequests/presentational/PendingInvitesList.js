import React from 'react';
import PendingInvitesListItemContainer from '../containers/PendingInvitesListItemContainer';

const PendingInvitesList = ({ invites }) =>
    invites.map(invite => (
        <PendingInvitesListItemContainer key={invite.id} invite={invite} />
    ));

export default PendingInvitesList;

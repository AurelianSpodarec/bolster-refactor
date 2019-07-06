import React from 'react';
import PendingInvitesListItemContainer from '../containers/PendingInvitesListItemContainer';

const PendingInvitesList = ({ invites, headers }) =>
    invites.map(invite => (
        <PendingInvitesListItemContainer
            key={invite.id}
            invite={invite}
            headers={headers}
        />
    ));

export default PendingInvitesList;

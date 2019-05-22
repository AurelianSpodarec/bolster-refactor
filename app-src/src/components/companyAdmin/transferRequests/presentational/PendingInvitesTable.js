import React from 'react';
import Table from 'components/shared/generic/tables/presentational/Table';
import PendingInvitesList from './PendingInvitesList';

const PendingInvitesTable = ({
    headers,
    isFetching,
    error,
    pendingInvites,
    outgoingInvites
}) => (
    <Table
        withActions
        headers={headers}
        isFetching={isFetching}
        noData={!pendingInvites.length && !outgoingInvites.length}
        noDataMessage="There are no pending invites to display."
        error={error}
    >
        {!!pendingInvites.length && (
            <PendingInvitesList invites={pendingInvites} />
        )}
        {!!outgoingInvites.length && (
            <PendingInvitesList invites={outgoingInvites} />
        )}
    </Table>
);

export default PendingInvitesTable;

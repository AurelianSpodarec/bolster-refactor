import React from 'react';
import Table from 'components/shared/generic/tables/presentational/Table';
import PendingInvitesList from './PendingInvitesList';

const PendingInvitesTable = () => {
    return (
        <Table>
            <PendingInvitesList />
        </Table>
    );
};

export default PendingInvitesTable;

import React from 'react';
import Table from 'components/shared/generic/tables/presentational/Table';
import CompanyUsersList from './CompanyUsersList';

const CompanyUsersTable = ({ users, isFetching, error, headers }) => (
    <Table
        headers={headers}
        isFetching={isFetching}
        error={error}
        noData={!users.length}
        noDataMessage="No users to display."
    >
        <CompanyUsersList users={users} />
    </Table>
);

export default CompanyUsersTable;

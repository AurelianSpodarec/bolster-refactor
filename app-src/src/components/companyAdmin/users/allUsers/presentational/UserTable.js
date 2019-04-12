import React from 'react';
import Table from 'components/shared/generic/tables/presentational/Table';
import UserList from '../presentational/UserList';

const UserTable = ({ users, headers, isFetching, error }) => (
    <Table
        withActions
        headers={headers}
        isFetching={isFetching}
        error={error}
        noData={!users.length}
        noDataMessage="No users to display"
    >
        <UserList colCount={headers.length} users={users} />
    </Table>
);
export default UserTable;

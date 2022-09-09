import React from 'react';
import Table from 'components/shared/generic/tables/presentational/Table';
import CompanyUsersList from './CompanyUsersList';

const CompanyUsersTable = ({ users, isFetching, error, headers, tableColumnWidths }) => (
    <>
        <div className="scrollable-table-outer size-lg-12">
            <div className="scrollable-table-inner">
                <Table
                    headers={headers}
                    isFetching={isFetching}
                    error={error}
                    noData={!users.length}
                    noDataMessage="No users to display."
                    tableColumnWidths={tableColumnWidths}
                >
                    <CompanyUsersList users={users} tableColumnWidths={tableColumnWidths} />
                </Table>
            </div>
        </div>
    </>
);

export default CompanyUsersTable;

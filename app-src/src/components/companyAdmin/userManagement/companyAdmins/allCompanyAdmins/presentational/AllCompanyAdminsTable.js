import React from 'react';
import { Link } from 'react-router-dom';

import Table from 'components/shared/generic/tables/presentational/Table';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import AllCompanyAdminsList from './AllCompanyAdminsList';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const AllCompanyAdminsTable = ({
    headers,
    users,
    isFetching,
    error,
    showDeleteModal
}) => {
    return (
        <BlockContainer>
            <BlockHeading title="Company Admins Table">
                <Link
                    className="button"
                    to="/company/users-management/company-admins/create"
                >
                    <i className="fa fa-plus" /> Add Company Admin
                </Link>
            </BlockHeading>
            <Table
                withActions
                headers={headers}
                isFetching={isFetching}
                error={error}
                noData={!users.length}
                noDataMessage="No admins to display"
                extraClasses="large"
            >
                <AllCompanyAdminsList
                    colCount={headers.length}
                    users={users}
                    showDeleteModal={showDeleteModal}
                />
            </Table>
        </BlockContainer>
    );
};

export default AllCompanyAdminsTable;

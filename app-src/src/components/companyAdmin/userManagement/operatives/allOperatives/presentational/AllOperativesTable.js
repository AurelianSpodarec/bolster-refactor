import React from 'react';
import { Link } from 'react-router-dom';

import Table from 'components/shared/generic/tables/presentational/Table';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import AllOperativesList from './AllOperativesList';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const AllOperativesTable = ({ headers, users, isFetching, error }) => {
    return (
        <BlockContainer>
            <BlockHeading title="Operatives">
                <Link
                    className="button green"
                    to="/company/users-management/operatives/create"
                >
                    <i className="fa fa-plus" /> Invite Operative
                </Link>
            </BlockHeading>
            <Table
                withActions
                headers={headers}
                isFetching={isFetching}
                error={error}
                noData={!users.length}
                noDataMessage="No admins to display"
            >
                <AllOperativesList colCount={headers.length} users={users} />
            </Table>
        </BlockContainer>
    );
};

export default AllOperativesTable;

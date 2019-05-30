import React from 'react';
import { Link } from 'react-router-dom';

import Table from 'components/shared/generic/tables/presentational/Table';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import AllOperativesListItemContainer from '../containers/AllOperativesListItemContainer';

const AllOperativesTable = ({ headers, users, isFetching, error }) => (
    <BlockContainer>
        <BlockHeading title="Operatives">
            <Link
                className="button green"
                to="/company/users-management/operatives/create"
            >
                <i className="fa fa-plus" /> Attach Operative
            </Link>
        </BlockHeading>
        <Table
            withActions
            headers={headers}
            isFetching={isFetching}
            error={error}
            noData={!users.length}
            noDataMessage="No operatives to display."
        >
            {users.map(user => (
                <AllOperativesListItemContainer key={user.id} user={user} />
            ))}
        </Table>
    </BlockContainer>
);

export default AllOperativesTable;

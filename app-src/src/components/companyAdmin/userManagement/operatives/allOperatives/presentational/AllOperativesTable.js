import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import AllOperativesListItemContainer from '../containers/AllOperativesListItemContainer';

const AllOperativesTable = ({
    headers,
    users,
    isFetching,
    error,
    handleShowModal
}) => (
    <BlockContainer>
        <BlockHeading title="Operatives">
            <button className="button green" onClick={handleShowModal}>
                <i className="fa fa-plus" /> Attach Operative
            </button>
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

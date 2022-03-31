import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import AllOperativesListItemContainer from '../containers/AllOperativesListItemContainer';

const AllOperativesTable = ({ headers, users, isFetching, error, handleShowModal }) => (
    <>
        <BlockHeading title="Active Operatives">
            <button className="button green" onClick={handleShowModal}>
                <i className="fa fa-plus" /> Create Operative
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
                <AllOperativesListItemContainer key={user.id} headers={headers} user={user} />
            ))}
        </Table>
    </>
);

export default AllOperativesTable;

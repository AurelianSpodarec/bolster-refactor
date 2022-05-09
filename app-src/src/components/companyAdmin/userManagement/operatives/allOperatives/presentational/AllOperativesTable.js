import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import AllOperativesListItemContainer from '../containers/AllOperativesListItemContainer';
import ActionButton from '../../../../../shared/generic/button/presentational/ActionButton';

const AllOperativesTable = ({ headers, users, isFetching, error, handleShowModal }) => (
    <>
        <BlockHeading title="Active Operatives">
            <ActionButton
                onClick={handleShowModal}
                extraClasses="ambient-positive"
                text="Create Operative"
                icon="user-plus"
                size="medium"
            />
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

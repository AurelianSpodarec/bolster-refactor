import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import AllClientsList from './AllClientsList';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const AllClientsTable = ({ headers, users, isFetching, error }) => {
    return (
        <BlockContainer>
            <BlockHeading title="Clients" />
            <Table
                headers={headers}
                isFetching={isFetching}
                error={error}
                noData={!users.length}
                noDataMessage="No clients to display."
                extraClasses="large"
            >
                <AllClientsList colCount={headers.length} users={users} />
            </Table>
        </BlockContainer>
    );
};

export default AllClientsTable;

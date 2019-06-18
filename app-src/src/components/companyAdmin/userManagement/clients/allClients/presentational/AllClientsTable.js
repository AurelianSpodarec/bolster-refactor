import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import AllClientsList from './AllClientsList';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const AllClientsTable = ({ headers, clients, isFetching, error }) => (
    <BlockContainer>
        <BlockHeading title="Client Access" />
        <Table
            headers={headers}
            isFetching={isFetching}
            error={error}
            noData={!clients.length}
            noDataMessage="No clients to display."
            extraClasses="large"
        >
            <AllClientsList colCount={headers.length} clients={clients} />
        </Table>
    </BlockContainer>
);

export default AllClientsTable;

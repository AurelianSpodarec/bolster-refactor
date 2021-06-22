import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import AllClientsList from './AllClientsList';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const AllClientsTable = ({ headers, clients, isFetching, error }) => (
    <BlockContainer>
        <BlockHeading title="Clients">
            <ButtonContainer
                setColour="#2eac58"
                setColourHoverCode="#258e48"
                to="/company/users-management/clients/create"
            >
                <i className="fa fa-plus" />
                Add
            </ButtonContainer>
        </BlockHeading>
        <Table
            headers={headers}
            isFetching={isFetching}
            error={error}
            noData={!clients.length}
            noDataMessage="No clients to display."
            extraClasses="large"
        >
            <AllClientsList colCount={headers.length} clients={clients} headers={headers} />
        </Table>
    </BlockContainer>
);

export default AllClientsTable;

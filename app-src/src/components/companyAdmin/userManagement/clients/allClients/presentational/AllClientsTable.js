import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import AllClientsList from './AllClientsList';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import LinkButton from 'components/shared/generic/button/presentational/LinkButton';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';

const AllClientsTable = ({ headers, clients, isFetching, error }) => (
    <BlockContainer>
        <BlockHeading title="Clients">
            <ButtonWrapper alignment="right">
                <LinkButton
                    href="/company/users-management/clients/create"
                    text="Add Client"
                    icon="user-plus"
                    size="medium"
                    extraClasses="ambient-positive"
                />
            </ButtonWrapper>
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

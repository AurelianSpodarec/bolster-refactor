import React from 'react';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import TransferRequestsTableContainer from '../containers/TransferRequestsTableContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const TransferRequests = () => (
    <>
        <PageHeading title="Pending Requests" />
        <BlockContainer>
            <BlockHeading title="Pending Invites" />
        </BlockContainer>
        <BlockContainer>
            <BlockHeading title="Owner Requests" />
            <TransferRequestsTableContainer />
        </BlockContainer>
    </>
);

export default TransferRequests;

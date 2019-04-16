import React from 'react';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import TransferRequestsTableContainer from '../containers/TransferRequestsTableContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const TransferRequests = () => {
    return (
        <>
            <PageHeading title="Owner Requests" />
            <BlockContainer>
                <BlockHeading title="Owner Requests Table" />
                <TransferRequestsTableContainer />
            </BlockContainer>
        </>
    );
};

export default TransferRequests;

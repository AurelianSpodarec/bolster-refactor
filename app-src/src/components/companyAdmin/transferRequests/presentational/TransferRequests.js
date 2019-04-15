import React from 'react';
import Block from 'components/shared/generic/block/presentational/Block';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import TransferRequestsTableContainer from '../containers/TransferRequestsTableContainer';

const TransferRequests = () => {
    return (
        <Block>
            <BlockHeading title="Owner Requests" />
            <TransferRequestsTableContainer />
        </Block>
    );
};

export default TransferRequests;

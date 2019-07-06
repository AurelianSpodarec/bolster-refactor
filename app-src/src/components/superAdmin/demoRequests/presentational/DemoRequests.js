import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import DemoRequestsTableContainer from '../containers/DemoRequestsTableContainer';

const DemoRequests = () => (
    <>
        <PageHeading title="User demo requests" withBackButton />

        <BlockContainer>
            <BlockHeading title="Companies" />

            <DemoRequestsTableContainer />
        </BlockContainer>
    </>
);

export default DemoRequests;

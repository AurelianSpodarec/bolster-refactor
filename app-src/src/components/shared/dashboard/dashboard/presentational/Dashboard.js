import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const Dashboard = () => (
    <>
        <PageHeading title="Dashboard" />
        <BlockContainer>
            <BlockHeading title="Live Pin Feed" />
        </BlockContainer>
    </>
);

export default Dashboard;

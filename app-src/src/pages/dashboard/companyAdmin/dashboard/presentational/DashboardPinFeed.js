import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import DashboardPinFeedTable from './DashboardPinFeedTable';

const DashboardPinFeed = ({ pins, isFetching, error }) => (
    <BlockContainer containerClass="flex-row-item size-lg-6 size-md-12">
        <BlockHeading title="Live Pin Feed" />
        <DashboardPinFeedTable
            pins={pins}
            isFetching={isFetching}
            error={error}
            headers={['Pin ID', 'Location', 'Added', 'Synced', 'Actions']}
        />
    </BlockContainer>
);

export default DashboardPinFeed;

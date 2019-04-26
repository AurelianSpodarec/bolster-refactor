import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import OperativeAlertsTableContainer from '../containers/OperativeAlertsTableContainer';

const AllOperativeAlerts = () => (
    <>
        <PageHeading title="Operative Alerts" withBackButton />
        <BlockContainer>
            <OperativeAlertsTableContainer />
        </BlockContainer>
    </>
);

export default AllOperativeAlerts;

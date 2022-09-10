import React from 'react';
import BlockHeading from 'components_DEPRECATED/shared/generic/blockHeading/presentational/BlockHeading';
import DashboardDataByTableRoute from '../containers/DashboardDataByTableRoute';
import TabsContainer from 'components_DEPRECATED/shared/generic/tabs/containers/TabsContainer';

const DashboardDataBy = ({ selectedTab, onMobile }) => (
    <>
        <BlockHeading title={`Data by active ${selectedTab}`} />
        <TabsContainer classes="rounded" />
        <DashboardDataByTableRoute onMobile={onMobile} />
    </>
);

export default DashboardDataBy;

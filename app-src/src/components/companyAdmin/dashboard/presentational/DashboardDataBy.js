import React from 'react';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import DashboardDataByTableRoute from '../containers/DashboardDataByTableRoute';
import TabsContainer from 'components/shared/generic/tabs/containers/TabsContainer';

const DashboardDataBy = ({ selectedTab, onMobile }) => (
    <>
        <BlockHeading title={`Data by active ${selectedTab}`} />
        <TabsContainer />
        <DashboardDataByTableRoute onMobile={onMobile} />
    </>
);

export default DashboardDataBy;

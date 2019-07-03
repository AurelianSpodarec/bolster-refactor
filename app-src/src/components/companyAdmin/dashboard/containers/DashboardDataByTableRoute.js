import React from 'react';
import { connect } from 'react-redux';

import { DASHBOARD_TABS as TABS } from 'constants/shared/tabNames';

import DashboardDataByOperativeTableContainer from './DashboardDataByOperativeTableContainer';
import DashboardDataByDrawingTableContainer from './DashboardDataByDrawingTableContainer';

const DashboardDataByTableRoute = ({ selectedTab, onMobile }) => {
    const contentOptions = {
        [TABS.OPERATIVES]: DashboardDataByOperativeTableContainer,
        [TABS.DRAWINGS]: DashboardDataByDrawingTableContainer
    };

    const SpecificContent =
        contentOptions[selectedTab] || contentOptions[TABS.OPERATIVES];

    return <SpecificContent onMobile={onMobile} />;
};

export default connect(({ shared: { tabsReducer: { selectedTab } } }) => ({
    selectedTab
}))(DashboardDataByTableRoute);

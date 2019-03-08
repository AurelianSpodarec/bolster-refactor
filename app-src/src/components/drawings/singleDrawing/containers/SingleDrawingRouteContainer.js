import React from 'react';
import { connect } from 'react-redux';

import { DRAWING_TABS as TABS } from 'constants/tabNames';

import GeneralOverview from '../presentational/GeneralOverview';
import AdvancedReport from '../presentational/AdvancedReport';

const contentOptions = {
    [TABS.GENERAL_OVERVIEW]: GeneralOverview,
    [TABS.ADVANCED_REPORT]: AdvancedReport
};

const DrawingRouteContainer = ({ selectedTab }) => {
    const SpecificContent =
        contentOptions[selectedTab] || contentOptions[TABS.GENERAL_OVERVIEW];

    return <SpecificContent />;
};

export default connect(({ tabsReducer }) => ({
    selectedTab: tabsReducer.selectedTab
}))(DrawingRouteContainer);

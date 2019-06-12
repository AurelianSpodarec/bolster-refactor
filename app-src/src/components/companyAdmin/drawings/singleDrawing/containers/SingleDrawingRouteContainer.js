import React from 'react';
import { connect } from 'react-redux';

import { DRAWING_TABS as TABS } from 'constants/shared/tabNames';

import GeneralOverviewContainer from './GeneralOverviewContainer';
import AdvancedReportContainer from './AdvancedReportContainer';

const DrawingRouteContainer = ({ selectedTab }) => {
    const contentOptions = {
        [TABS.GENERAL_OVERVIEW]: GeneralOverviewContainer,
        [TABS.GENERATE_REPORT]: AdvancedReportContainer
    };

    const SpecificContent =
        contentOptions[selectedTab] || contentOptions[TABS.GENERAL_OVERVIEW];

    return <SpecificContent />;
};

export default connect(({ shared: { tabsReducer: { selectedTab } } }) => ({
    selectedTab
}))(DrawingRouteContainer);

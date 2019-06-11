import React from 'react';
import { connect } from 'react-redux';

import { DRAWING_TABS as TABS } from 'constants/shared/tabNames';

import DrawingMapGeneralContainer from './DrawingMapGeneralContainer';
import AdvancedReportContainer from './AdvancedReportContainer';

const contentOptions = {
    [TABS.GENERAL_OVERVIEW]: DrawingMapGeneralContainer,
    [TABS.GENERATE_REPORT]: AdvancedReportContainer
};

const DrawingRouteContainer = ({ selectedTab }) => {
    const SpecificContent =
        contentOptions[selectedTab] || contentOptions[TABS.GENERAL_OVERVIEW];

    return <SpecificContent />;
};

export default connect(({ shared: { tabsReducer } }) => ({
    selectedTab: tabsReducer.selectedTab
}))(DrawingRouteContainer);

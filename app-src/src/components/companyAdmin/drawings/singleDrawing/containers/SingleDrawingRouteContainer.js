import React from 'react';
import { connect } from 'react-redux';

import { DRAWING_TABS as TABS } from 'constants/shared/tabNames';

import AdvancedReport from '../presentational/AdvancedReport';
import GeneralOverviewContainer from './GeneralOverviewContainer';

const contentOptions = {
    [TABS.GENERAL_OVERVIEW]: GeneralOverviewContainer,
    [TABS.ADVANCED_REPORT]: AdvancedReport
};

const DrawingRouteContainer = ({ selectedTab }) => {
    const SpecificContent =
        contentOptions[selectedTab] || contentOptions[TABS.GENERAL_OVERVIEW];

    return <SpecificContent />;
};

export default connect(({ shared: { tabsReducer } }) => ({
    selectedTab: tabsReducer.selectedTab
}))(DrawingRouteContainer);

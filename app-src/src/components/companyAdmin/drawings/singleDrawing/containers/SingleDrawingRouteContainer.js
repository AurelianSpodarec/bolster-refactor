import React from 'react';
import { connect } from 'react-redux';

import { DRAWING_TABS as TABS } from 'constants/shared/tabNames';

import AdvancedReport from '../presentational/AdvancedReport';
import GeneralOverviewContainer from './GeneralOverviewContainer';

const DrawingRouteContainer = ({ selectedTab }) => {
    const contentOptions = {
        [TABS.GENERAL_OVERVIEW]: GeneralOverviewContainer,
        [TABS.ADVANCED_REPORT]: AdvancedReport
    };

    const SpecificContent =
        contentOptions[selectedTab] || contentOptions[TABS.GENERAL_OVERVIEW];

    return <SpecificContent />;
};

export default connect(({ shared: { tabsReducer: { selectedTab } } }) => ({
    selectedTab
}))(DrawingRouteContainer);

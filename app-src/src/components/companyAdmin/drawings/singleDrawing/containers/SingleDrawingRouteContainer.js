import React from 'react';
import { connect } from 'react-redux';

import { DRAWING_TABS as TABS } from 'constants/shared/tabNames';

import GeneralOverviewContainer from './GeneralOverviewContainer';
import HierarchyAdvancedReport from 'components/companyAdmin/reports/createReport/components/presentational/HierarchyAdvancedReport';

const DrawingRouteContainer = ({ selectedTab }) => {
    const contentOptions = {
        [TABS.GENERAL_OVERVIEW]: GeneralOverviewContainer,
        [TABS.ADVANCED_REPORT]: HierarchyAdvancedReport
    };

    const SpecificContent =
        contentOptions[selectedTab] || contentOptions[TABS.GENERAL_OVERVIEW];

    return <SpecificContent />;
};

export default connect(({ shared: { tabsReducer: { selectedTab } } }) => ({
    selectedTab
}))(DrawingRouteContainer);

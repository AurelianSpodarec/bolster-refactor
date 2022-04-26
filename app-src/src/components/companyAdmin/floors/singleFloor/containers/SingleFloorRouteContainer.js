import React from 'react';
import { connect } from 'react-redux';
import { FLOOR_TABS } from 'constants/shared/tabNames';
import FloorGeneralOverview from '../presentational/FloorGeneralOverview';
import HierarchyAdvancedReport from 'components/companyAdmin/reports/createReport/components/presentational/HierarchyAdvancedReport';
import CostingAndEstimating from '../../../costingAndEstimating/CostingAndEstimating';

const FloorRouteContainer = ({ selectedTab }) => {
    const contentOptions = {
        [FLOOR_TABS.GENERAL_OVERVIEW]: FloorGeneralOverview,
        [FLOOR_TABS.ESTIMATING]: CostingAndEstimating,
        [FLOOR_TABS.COSTING]: CostingAndEstimating,
        [FLOOR_TABS.GENERATE_REPORT]: HierarchyAdvancedReport,
    };

    const SpecificContent =
        contentOptions[selectedTab] || contentOptions[FLOOR_TABS.GENERAL_OVERVIEW];

    return <SpecificContent />;
};

const mapStateToProps = ({
    shared: {
        tabsReducer: { selectedTab },
    },
}) => ({
    selectedTab,
});

export default connect(mapStateToProps)(FloorRouteContainer);

import React from 'react';
import { connect } from 'react-redux';
import { DRAWING_TABS } from 'constants/shared/tabNames';
import HierarchyAdvancedReport from 'components/companyAdmin/reports/createReport/components/presentational/HierarchyAdvancedReport';
import CostingAndEstimating from '../../../costingAndEstimating/CostingAndEstimating';
import GeneralOverview from '../presentational/GeneralOverview';

const SingleDrawingRouteContainer = ({ selectedTab }) => {
    const contentOptions = {
        [DRAWING_TABS.GENERAL_OVERVIEW]: GeneralOverview,
        [DRAWING_TABS.ESTIMATING]: CostingAndEstimating,
        [DRAWING_TABS.COSTING]: CostingAndEstimating,
        [DRAWING_TABS.GENERATE_REPORT]: HierarchyAdvancedReport,
    };

    const SpecificContent =
        contentOptions[selectedTab] || contentOptions[DRAWING_TABS.GENERAL_OVERVIEW];

    return <SpecificContent />;
};

const mapStateToProps = ({
    shared: {
        tabsReducer: { selectedTab },
    },
}) => ({
    selectedTab,
});

export default connect(mapStateToProps)(SingleDrawingRouteContainer);

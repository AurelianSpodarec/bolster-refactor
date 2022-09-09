import React from 'react';
import { connect } from 'react-redux';
import { HIERARCHY_TABS } from 'constants/shared/tabNames';
import HierarchyAdvancedReport from 'pages/dashboard/companyAdmin/reports/createReport/components/presentational/HierarchyAdvancedReport';
import GeneralOverview from './GeneralOverviewContainer';
import Estimating from '../../../costingAndEstimating/Estimating';
import Costing from '../../../costingAndEstimating/Costing';

const SingleDrawingRouteContainer = ({ selectedTab }) => {
    const contentOptions = {
        [HIERARCHY_TABS.GENERAL_OVERVIEW]: GeneralOverview,
        [HIERARCHY_TABS.ESTIMATING]: Estimating,
        [HIERARCHY_TABS.COSTING]: Costing,
        [HIERARCHY_TABS.GENERATE_REPORT]: HierarchyAdvancedReport,
    };

    const SpecificContent =
        contentOptions[selectedTab] || contentOptions[HIERARCHY_TABS.GENERAL_OVERVIEW];

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

import React from 'react';
import { connect } from 'react-redux';
import { HIERARCHY_TABS } from 'constants/shared/tabNames';
import SingleSiteGeneralOverview from '../presentational/SingleSiteGeneralOverview';
import HierarchyAdvancedReport from 'components/companyAdmin/reports/createReport/components/presentational/HierarchyAdvancedReport';
import Costing from '../../../costingAndEstimating/Costing';
import Estimating from '../../../costingAndEstimating/Estimating';

const SiteRouteContainer = ({ selectedTab }) => {
    const contentOptions = {
        [HIERARCHY_TABS.GENERAL_OVERVIEW]: SingleSiteGeneralOverview,
        [HIERARCHY_TABS.ESTIMATING]: Costing,
        [HIERARCHY_TABS.COSTING]: Estimating,
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

export default connect(mapStateToProps)(SiteRouteContainer);

import React from 'react';
import { connect } from 'react-redux';
import { SITE_TABS } from 'constants/shared/tabNames';
import SingleSiteGeneralOverview from '../presentational/SingleSiteGeneralOverview';
import HierarchyAdvancedReport from 'components/companyAdmin/reports/createReport/components/presentational/HierarchyAdvancedReport';
import CostingAndEstimating from '../../../costingAndEstimating/CostingAndEstimating';

const SiteRouteContainer = ({ selectedTab }) => {
    const contentOptions = {
        [SITE_TABS.GENERAL_OVERVIEW]: SingleSiteGeneralOverview,
        [SITE_TABS.ESTIMATING]: CostingAndEstimating,
        [SITE_TABS.COSTING]: CostingAndEstimating,
        [SITE_TABS.GENERATE_REPORT]: HierarchyAdvancedReport,
    };

    const SpecificContent =
        contentOptions[selectedTab] || contentOptions[SITE_TABS.GENERAL_OVERVIEW];

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

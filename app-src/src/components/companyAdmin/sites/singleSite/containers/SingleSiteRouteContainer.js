import React from 'react';
import { connect } from 'react-redux';
import { SITE_TABS } from 'constants/shared/tabNames';
import SingleSiteGeneralOverview from '../presentational/SingleSiteGeneralOverview';
import SingleSiteAdvancedReport from '../presentational/SingleSiteAdvancedReport';

const SiteRouteContainer = ({ selectedTab }) => {
    const contentOptions = {
        [SITE_TABS.GENERAL_OVERVIEW]: SingleSiteGeneralOverview,
        [SITE_TABS.ADVANCED_REPORT]: SingleSiteAdvancedReport
    };

    const SpecificContent =
        contentOptions[selectedTab] ||
        contentOptions[SITE_TABS.GENERAL_OVERVIEW];

    return <SpecificContent />;
};

const mapStateToProps = ({
    shared: {
        tabsReducer: { selectedTab }
    }
}) => ({
    selectedTab
});

export default connect(mapStateToProps)(SiteRouteContainer);

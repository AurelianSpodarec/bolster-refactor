import React from 'react';
import { connect } from 'react-redux';
import { BUILDING_TABS } from 'constants/shared/tabNames';
import BuildingGeneralOverview from '../presentational/BuildingGeneralOverview';
import SingleBuildingAdvancedReport from '../presentational/SingleBuildingAdvancedReport';

const BuildingRouteContainer = ({ selectedTab }) => {
    const contentOptions = {
        [BUILDING_TABS.GENERAL_OVERVIEW]: BuildingGeneralOverview,
        [BUILDING_TABS.ADVANCED_REPORT]: SingleBuildingAdvancedReport
    };

    const SpecificContent =
        contentOptions[selectedTab] ||
        contentOptions[BUILDING_TABS.GENERAL_OVERVIEW];

    return <SpecificContent />;
};

const mapStateToProps = ({
    shared: {
        tabsReducer: { selectedTab }
    }
}) => ({
    selectedTab
});

export default connect(mapStateToProps)(BuildingRouteContainer);

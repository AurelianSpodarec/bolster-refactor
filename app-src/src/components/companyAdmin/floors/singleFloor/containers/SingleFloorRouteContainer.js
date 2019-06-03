import React from 'react';
import { connect } from 'react-redux';
import { FLOOR_TABS } from 'constants/shared/tabNames';
import FloorGeneralOverview from '../presentational/FloorGeneralOverview';
import SingleFloorAdvancedReport from '../presentational/SingleFloorAdvancedReport';

const FloorRouteContainer = ({ selectedTab }) => {
    const contentOptions = {
        [FLOOR_TABS.GENERAL_OVERVIEW]: FloorGeneralOverview,
        [FLOOR_TABS.ADVANCED_REPORT]: SingleFloorAdvancedReport
    };

    const SpecificContent =
        contentOptions[selectedTab] ||
        contentOptions[FLOOR_TABS.GENERAL_OVERVIEW];

    return <SpecificContent />;
};

const mapStateToProps = ({
    shared: {
        tabsReducer: { selectedTab }
    }
}) => ({
    selectedTab
});

export default connect(mapStateToProps)(FloorRouteContainer);

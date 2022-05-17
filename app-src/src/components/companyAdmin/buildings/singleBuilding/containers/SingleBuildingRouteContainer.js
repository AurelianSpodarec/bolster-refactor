import React from 'react';
import { connect } from 'react-redux';
import { BUILDING_TABS } from 'constants/shared/tabNames';
import BuildingGeneralOverview from '../presentational/BuildingGeneralOverview';
import HierarchyAdvancedReport from 'components/companyAdmin/reports/createReport/components/presentational/HierarchyAdvancedReport';
import CostingAndEstimating from '../../../costingAndEstimating/CostingAndEstimating';
import Costing from '../../../costingAndEstimating/Costing';
import Estimating from '../../../costingAndEstimating/Estimating';

const BuildingRouteContainer = ({ selectedTab }) => {
    const contentOptions = {
        [BUILDING_TABS.GENERAL_OVERVIEW]: BuildingGeneralOverview,
        [BUILDING_TABS.ESTIMATING]: Estimating,
        [BUILDING_TABS.COSTING]: Costing,
        [BUILDING_TABS.GENERATE_REPORT]: HierarchyAdvancedReport,
    };

    const SpecificContent =
        contentOptions[selectedTab] || contentOptions[BUILDING_TABS.GENERAL_OVERVIEW];

    return <SpecificContent />;
};

const mapStateToProps = ({
    shared: {
        tabsReducer: { selectedTab },
    },
}) => ({
    selectedTab,
});

export default connect(mapStateToProps)(BuildingRouteContainer);

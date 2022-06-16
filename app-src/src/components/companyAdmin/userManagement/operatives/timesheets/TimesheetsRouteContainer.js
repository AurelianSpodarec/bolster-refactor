import React from 'react';
import { connect } from 'react-redux';
import { TIMESHEETS_TABS } from 'constants/shared/tabNames';
import GeneralOverview from './generalOverview/GeneralOverview';
import Wages from './wages/Wages';

const TimesheetsRouteContainer = ({ selectedTab, ...props }) => {
    const contentOptions = {
        [TIMESHEETS_TABS.GENERAL_OVERVIEW]: GeneralOverview,
        [TIMESHEETS_TABS.WAGES]: Wages,
        [TIMESHEETS_TABS.JOB_REFERENCES]: GeneralOverview,
    };

    const SpecificContent =
        contentOptions[selectedTab] || contentOptions[TIMESHEETS_TABS.GENERAL_OVERVIEW];

    return <SpecificContent {...props} />;
};

const mapStateToProps = ({
    shared: {
        tabsReducer: { selectedTab },
    },
}) => ({
    selectedTab,
});

export default connect(mapStateToProps)(TimesheetsRouteContainer);

import React from 'react';
import { connect } from 'react-redux';

import selectTab from 'actions/shared/generic/tabs/sync/selectTab';

import Tabs from '../presentational/Tabs';

const TabsContainer = ({ dispatch, tabs, selectedTab, classes }) => (
    <Tabs
        tabs={tabs}
        selectedTab={selectedTab}
        selectTab={(e, tab) => {
            e.preventDefault();
            dispatch(selectTab(tab));
        }}
        classes={classes}
    />
);

const mapStateToProps = ({ shared: { tabsReducer } }) => tabsReducer;

export default connect(mapStateToProps)(TabsContainer);

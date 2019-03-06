import React from 'react';
import { connect } from 'react-redux';

import selectTab from 'actions/generic/tabs/sync/selectTab';

import Tabs from '../presentational/Tabs';

const TabsContainer = ({ dispatch, tabs, selectedTab }) => (
    <Tabs
        tabs={tabs}
        selectedTab={selectedTab}
        selectTab={(e, tab) => {
            e.preventDefault();
            dispatch(selectTab(tab));
        }}
    />
);

const mapStateToProps = state => state.genericReducers.tabs;

export default connect(mapStateToProps)(TabsContainer);

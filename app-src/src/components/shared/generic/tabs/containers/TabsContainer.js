import React from 'react';
import { connect } from 'react-redux';

import selectTab from 'actions/shared/generic/tabs/sync/selectTab';

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

const mapStateToProps = ({ tabsReducer }) => tabsReducer;

export default connect(mapStateToProps)(TabsContainer);

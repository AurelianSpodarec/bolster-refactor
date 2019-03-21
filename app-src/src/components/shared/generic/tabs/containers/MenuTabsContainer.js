import React from 'react';
import { connect } from 'react-redux';

import selectMenuTab from 'actions/generic/tabs/sync/selectMenuTab';

import Tabs from '../presentational/Tabs';

const MenuTabsContainer = ({ dispatch, menuTabs, selectedMenuTab }) => (
    <Tabs
        tabs={menuTabs}
        selectedTab={selectedMenuTab}
        selectTab={(e, tab) => {
            e.preventDefault();
            dispatch(selectMenuTab(tab));
        }}
    />
);

const mapStateToProps = ({ tabsReducer }) => ({
    menuTabs: tabsReducer.menuTabs,
    selectedMenuTab: tabsReducer.selectedMenuTab
});

export default connect(mapStateToProps)(MenuTabsContainer);

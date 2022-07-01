import React from 'react';
import { connect } from 'react-redux';

import selectTab from 'actions/shared/generic/tabs/sync/selectTab';

import Tabs from '../presentational/Tabs';
import useIsAdminPlus from '../../../../../hooks/useIsAdminPlus';

const TabsContainer = ({ dispatch, tabs, selectedTab, classes }) => {
    const isAdminPlus = useIsAdminPlus();

    const filteredTabs = tabs.filter(tab =>
        !isAdminPlus
            ? !tab.toLowerCase().includes('costing') &&
              !tab.toLowerCase().includes('estimating') &&
              !tab.toLowerCase().includes('wages')
            : true,
    );

    return (
        <Tabs
            tabs={filteredTabs}
            selectedTab={selectedTab}
            selectTab={(e, tab) => {
                e.preventDefault();
                dispatch(selectTab(tab));
            }}
            classes={classes}
        />
    );
};

const mapStateToProps = ({
    shared: {
        tabsReducer: { selectedTab, tabs },
    },
}) => ({ tabs, selectedTab });

export default connect(mapStateToProps)(TabsContainer);

import React from 'react';
import { connect, useSelector } from 'react-redux';

import selectTab from 'actions/shared/generic/tabs/sync/selectTab';

import Tabs from '../presentational/Tabs';
import { selectSelectedTab, selectTabs } from '../../../../../selectors/shared/tabs';
import useIsAdminPlus from '../../../../../hooks/useIsAdminPlus';
import useBolsterPlus from '../../../../companyAdmin/subscription/addOns/hooks/useBolsterPlus';

const TabsContainer = ({ dispatch, classes }) => {
    const selectedTab = useSelector(selectSelectedTab);
    const tabs = useSelector(selectTabs);
    const isAdminPlus = useIsAdminPlus();
    const { isBolsterPlusActivated } = useBolsterPlus();
    return (
        <Tabs
            tabs={tabs}
            selectedTab={selectedTab}
            selectTab={(e, tab) => {
                e.preventDefault();
                dispatch(selectTab(tab));
            }}
            classes={classes}
            isAdminPlus={isAdminPlus}
            isBolsterPlus={isBolsterPlusActivated}
        />
    );
};

const mapStateToProps = ({
    shared: {
        tabsReducer: { selectedTab, tabs },
    },
}) => ({ tabs, selectedTab });

export default connect(mapStateToProps)(TabsContainer);

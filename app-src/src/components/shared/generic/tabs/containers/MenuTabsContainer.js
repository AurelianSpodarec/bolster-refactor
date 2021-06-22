import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import selectMenuTab from 'actions/shared/generic/tabs/sync/selectMenuTab';

import Tabs from '../presentational/Tabs';

const MenuTabsContainer = () => {
    const dispatch = useDispatch();
    const { menuTabs, selectedMenuTab, isSuperAdmin, isClientAccess, isCompanyAdmin } = useSelector(
        mapStateToProps,
    );

    let filteredTabs = menuTabs;

    if (!isSuperAdmin) filteredTabs = menuTabs.filter(tab => tab !== 'Super Admin');
    if (!isCompanyAdmin) filteredTabs = menuTabs.filter(tab => tab !== 'Admin');
    if (!isClientAccess) filteredTabs = menuTabs.filter(tab => tab !== 'Client Access');

    if (isClientAccess && isCompanyAdmin) {
        filteredTabs = menuTabs.filter(
            tab => tab !== 'Client Access' && tab !== 'Admin' && tab !== 'Super Admin',
        );
    }

    return (
        <Tabs
            tabs={filteredTabs}
            selectedTab={selectedMenuTab}
            selectTab={(e, tab) => {
                e.preventDefault();
                dispatch(selectMenuTab(tab));
            }}
            isSuperAdmin={isSuperAdmin}
            isCompanyAdmin={isCompanyAdmin}
            isClientAccess={isClientAccess}
        />
    );
};

const mapStateToProps = ({
    shared: {
        tabsReducer,
        decodeJWTReducer: { jwtData },
    },
}) => ({
    menuTabs: tabsReducer.menuTabs,
    selectedMenuTab: tabsReducer.selectedMenuTab,
    isSuperAdmin: jwtData.isSuperAdmin,
    isCompanyAdmin: jwtData.isCompanyAdmin,
    isClientAccess: jwtData.isClientAccess,
});

export default MenuTabsContainer;

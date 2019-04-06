import React from 'react';
import { connect } from 'react-redux';

import { MENU_TABS as TABS } from 'constants/shared/tabNames';

import CompanyMenu from '../presentational/CompanyMenu';
import SuperAdminMenu from '../presentational/SuperAdminMenu';

const contentOptions = {
    [TABS.COMPANY_USER]: CompanyMenu,
    [TABS.SUPER_ADMIN]: SuperAdminMenu
};

const MenusRouteContainer = ({ selectedMenuTab }) => {
    const SpecificContent = contentOptions[selectedMenuTab] || CompanyMenu;

    return <SpecificContent />;
};

export default connect(({ shared: { tabsReducer } }) => ({
    selectedMenuTab: tabsReducer.selectedMenuTab
}))(MenusRouteContainer);

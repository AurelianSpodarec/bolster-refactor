import React from 'react';
import { connect } from 'react-redux';

import { MENU_TABS as TABS } from 'constants/shared/tabNames';

import CompanyMenu from '../presentational/CompanyMenu';
import SuperAdminMenuContainer from './SuperAdminMenuContainer';
import CompanyMenuContainer from './CompanyMenuContainer';

const contentOptions = {
    [TABS.COMPANY_USER]: CompanyMenuContainer,
    [TABS.SUPER_ADMIN]: SuperAdminMenuContainer
};

const MenusRouteContainer = ({ selectedMenuTab }) => {
    const SpecificContent = contentOptions[selectedMenuTab] || CompanyMenu;

    return <SpecificContent />;
};

export default connect(({ shared: { tabsReducer } }) => ({
    selectedMenuTab: tabsReducer.selectedMenuTab
}))(MenusRouteContainer);

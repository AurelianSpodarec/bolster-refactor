import React from 'react';
import { connect } from 'react-redux';

import { MENU_TABS } from 'constants/shared/tabNames';

import CompanyMenu from '../presentational/CompanyMenu';
import SuperAdminMenuContainer from './SuperAdminMenuContainer';
import CompanyMenuContainer from './CompanyMenuContainer';
import ClientMenuContainer from './ClientMenuContainer';

const contentOptions = {
    [MENU_TABS.COMPANY_USER]: CompanyMenuContainer,
    [MENU_TABS.SUPER_ADMIN]: SuperAdminMenuContainer,
    [MENU_TABS.CLIENT]: ClientMenuContainer
};

const MenusRouteContainer = ({ selectedMenuTab }) => {
    const SpecificContent = contentOptions[selectedMenuTab] || CompanyMenu;

    return <SpecificContent />;
};

export default connect(({ shared: { tabsReducer } }) => ({
    selectedMenuTab: tabsReducer.selectedMenuTab
}))(MenusRouteContainer);

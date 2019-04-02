import React from 'react';
import { connect } from 'react-redux';

import { MENU_TABS as TABS } from 'constants/companyAdmin/tabNames';

import Menu from '../presentational/Menu';
import SuperAdminMenu from '../presentational/SuperAdminMenu';

const contentOptions = {
    [TABS.COMPANY_ADMIN]: Menu,
    [TABS.SUPER_ADMIN]: SuperAdminMenu
};

const MenusRouteContainer = ({ selectedMenuTab }) => {
    const SpecificContent =
        contentOptions[selectedMenuTab] || contentOptions[TABS.SUPER_ADMIN];

    return <SpecificContent />;
};

export default connect(({ tabsReducer }) => ({
    selectedMenuTab: tabsReducer.selectedMenuTab
}))(MenusRouteContainer);

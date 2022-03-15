import React from 'react';
import MenusRouteContainer from '../containers/MenusRouteContainer';
import MenuTabsContainer from 'components/shared/generic/tabs/containers/MenuTabsContainer';

const MenusWrapper = ({ showTabs, menuOpen }) => (
    <div className={`menu-wrapper ${menuOpen && 'mobile-open'}`}>
        {showTabs && <MenuTabsContainer />}
        <MenusRouteContainer />
    </div>
);

export default MenusWrapper;

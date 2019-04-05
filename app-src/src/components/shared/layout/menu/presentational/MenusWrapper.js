import React from 'react';
import MenusRouteContainer from '../containers/MenusRouteContainer';
import MenuTabsContainer from 'components/shared/generic/tabs/containers/MenuTabsContainer';

const MenusWrapper = ({ showTabs }) => (
    <div className="menu-wrapper size-lg-12">
        {showTabs && (
            <div className="size-lg-12" style={{ zIndex: 1 }}>
                <MenuTabsContainer />
            </div>
        )}
        <MenusRouteContainer />
    </div>
);

export default MenusWrapper;

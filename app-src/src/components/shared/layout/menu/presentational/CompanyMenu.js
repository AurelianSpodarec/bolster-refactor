import React from 'react';

import MenuItemContainer from '../containers/MenuItemContainer';

const CompanyMenu = ({ companyNavMenuItems }) => {
    return (
        <div className="menu">
            {companyNavMenuItems.map((navItem, index) => (
                <MenuItemContainer key={index} item={navItem} />
            ))}
        </div>
    );
};

export default CompanyMenu;

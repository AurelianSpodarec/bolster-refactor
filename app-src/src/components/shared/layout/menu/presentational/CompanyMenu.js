import React from 'react';

import MenuItemContainer from '../containers/MenuItemContainer';

const CompanyMenu = ({
    companyNavMenuItems,
    isSubscribed,
    isCompanyUserOrSelecting,
    isClientAccess,
    shouldRestrictPayments,
}) => {
    return (
        <div className="menu">
            {companyNavMenuItems.map((navItem, index) => (
                <MenuItemContainer
                    key={index}
                    item={navItem}
                    isSubscribed={isSubscribed}
                    isCompanyUserOrSelecting={isCompanyUserOrSelecting}
                    isClientAccess={isClientAccess}
                    shouldRestrictPayments={shouldRestrictPayments}
                />
            ))}
        </div>
    );
};

export default CompanyMenu;

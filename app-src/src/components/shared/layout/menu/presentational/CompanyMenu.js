import React from 'react';

import CompanyMenuItemContainer from '../containers/CompanyMenuItemContainer';
import bolsterLogo from '../../../../../_content/images/icons/Bolsterlogo.svg';

const CompanyMenu = ({
    companyNavMenuItems,
    isSubscribed,
    isCompanyUserOrSelecting,
    isClientAccess,
    shouldRestrictPayments,
}) => {
    return (
        <div className="menu">
            <div className="nav-wrapper">
                {companyNavMenuItems.map((navItem, index) => (
                    <CompanyMenuItemContainer
                        key={index}
                        item={navItem}
                        isSubscribed={isSubscribed}
                        isCompanyUserOrSelecting={isCompanyUserOrSelecting}
                        isClientAccess={isClientAccess}
                        shouldRestrictPayments={shouldRestrictPayments}
                    />
                ))}
            </div>

            <img src={bolsterLogo} alt="Bolster Logo" className="logo" />
        </div>
    );
};

export default CompanyMenu;

import React from 'react';

import MenuItemContainer from '../containers/MenuItemContainer';
import { companyNavMenuItems } from '../../../../../constants/companyAdmin/menuItems';

const CompanyMenu = ({
    isFromHeadquarters,
    unreadMessageCount,
    totalCredits,
    totalRequests,
    unreadCount,
    dismissMessages,
    isSubscribed,
    isClientAccess,
    handleGenerateQRCodesModal,
    shouldRestrictPayments,
    unreadReleaseNoteCount,
    isCompanySelection,
    isCompanyUser,
    companySettings,
}) => {
    const isCompanyUserOrSelecting = isCompanySelection || !isCompanyUser;

    return (
        <div className="menu">
            {isSubscribed &&
                !isCompanyUserOrSelecting &&
                companyNavMenuItems.map((navItem, index) => (
                    <MenuItemContainer key={index} item={navItem} />
                ))}
        </div>
    );
};

export default CompanyMenu;

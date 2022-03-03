import React from 'react';
import { useSelector } from 'react-redux';

import CompanyMenuItemContainer from '../containers/CompanyMenuItemContainer';
import bolsterLogo from '../../../../../_content/images/footer/powered-by-bolster-white.svg';
import { selectLatestAppVersion } from '../../../../../selectors/companyAdmin/app';

const CompanyMenu = ({
    companyNavMenuItems,
    isSubscribed,
    isCompanyUserOrSelecting,
    isClientAccess,
    shouldRestrictPayments,
}) => {
    const latestAppVersion = useSelector(selectLatestAppVersion);
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

            <div className="footer">
                <p>{latestAppVersion}</p>
                <img src={bolsterLogo} alt="Powered by Bolster" />
            </div>
        </div>
    );
};

export default CompanyMenu;

import React, { useState } from 'react';

import CompanyMenuItemContainer from '../containers/CompanyMenuItemContainer';
import bolsterLogo from '../../../../../_content/images/footer/powered-by-bolster-red.svg';
import bolsterLogoDarkMode from '../../../../../_content/images/footer/powered–by-bolster-white.svg';
import useColourTheme from '../../../../../hooks/useColourTheme';

const CompanyMenu = ({
    companyNavMenuItems,
    isSubscribed,
    isCompanyUserOrSelecting,
    isClientAccess,
    shouldRestrictPayments,
    latestAppVersion,
}) => {
    const [hoveredItem, setHoveredItem] = useState(null);
    const colourTheme = useColourTheme();

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
                        hoveredItem={hoveredItem}
                        setHoveredItem={setHoveredItem}
                    />
                ))}
            </div>

            <div className="nav-footer">
                <img
                    src={colourTheme === 'dark' ? bolsterLogoDarkMode : bolsterLogo}
                    alt="Powered by Bolster"
                />
                <p>App version: {latestAppVersion}</p>
            </div>
        </div>
    );
};

export default CompanyMenu;

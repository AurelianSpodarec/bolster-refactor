import React from 'react';

import { useWindowDimensions } from 'helpers/hooks';
import FrontEndHeaderDesktop from './FrontEndHeaderDesktop';
import FrontEndHeaderMobile from './FrontEndHeaderMobile';

const FrontEndHeader = ({
    isSuperAdmin,
    isCompanyAdmin,
    isClientAccess,
    handleClick,
    handleLogout,
    curRoute,
    menuOpen,
    setMenuOpen,
    hideHeader,
}) => {
    const { width } = useWindowDimensions();

    if (width <= 1100)
        return (
            <FrontEndHeaderMobile
                isSuperAdmin={isSuperAdmin}
                isCompanyAdmin={isCompanyAdmin}
                isClientAccess={isClientAccess}
                curRoute={curRoute}
                handleClick={handleClick}
                handleLogout={handleLogout}
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
                hideNav={hideHeader}
                screenWidth={width}
            />
        );

    return (
        <FrontEndHeaderDesktop
            isSuperAdmin={isSuperAdmin}
            isCompanyAdmin={isCompanyAdmin}
            isClientAccess={isClientAccess}
            curRoute={curRoute}
            handleClick={handleClick}
            handleLogout={handleLogout}
            hideHeader={hideHeader}
        />
    );
};

export default FrontEndHeader;

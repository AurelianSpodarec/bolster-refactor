import React from 'react';

import { useWindowDimensions } from 'helpers/hooks';
import FrontEndHeaderDesktop from './FrontEndHeaderDesktop';
import FrontEndHeaderMobile from './FrontEndHeaderMobile';

const FrontEndHeader = ({
    isSuperAdmin,
    isCompanyAdmin,
    isClientAccess,
    handleLogout,
    curRoute,
    menuOpen,
    setMenuOpen,
}) => {
    const { width } = useWindowDimensions();

    if (width <= 1100)
        return (
            <FrontEndHeaderMobile
                isSuperAdmin={isSuperAdmin}
                isCompanyAdmin={isCompanyAdmin}
                isClientAccess={isClientAccess}
                curRoute={curRoute}
                handleLogout={handleLogout}
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
            />
        );

    return (
        <FrontEndHeaderDesktop
            isSuperAdmin={isSuperAdmin}
            isCompanyAdmin={isCompanyAdmin}
            isClientAccess={isClientAccess}
            curRoute={curRoute}
            handleLogout={handleLogout}
        />
    );
};

export default FrontEndHeader;

import React from 'react';

import { useWindowDimensions } from 'helpers/hooks';
import FrontEndHeaderDesktop from './FrontEndHeaderDesktop';
import FrontEndHeaderMobile from './FrontEndHeaderMobile';

const FrontEndHeader = ({ isSuperAdmin, isCompanyAdmin, isClientAccess, logout, curRoute }) => {
    const { width } = useWindowDimensions();

    if (width <= 1100)
        return (
            <FrontEndHeaderMobile
                isSuperAdmin={isSuperAdmin}
                isCompanyAdmin={isCompanyAdmin}
                isClientAccess={isClientAccess}
                curRoute={curRoute}
                logout={logout}
            />
        );

    return (
        <FrontEndHeaderDesktop
            isSuperAdmin={isSuperAdmin}
            isCompanyAdmin={isCompanyAdmin}
            isClientAccess={isClientAccess}
            curRoute={curRoute}
            logout={logout}
        />
    );
};

export default FrontEndHeader;

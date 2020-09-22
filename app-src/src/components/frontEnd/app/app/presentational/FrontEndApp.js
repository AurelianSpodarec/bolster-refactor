import React from 'react';

import FrontEndRoutes from '../../routes/presentational';
import FrontEndFooter from 'components/frontEnd/layout/footer/presentational/FrontEndFooter';
import FrontEndHeaderContainer from 'components/frontEnd/layout/header/container/FrontEndHeaderContainer';

const FrontEndApp = ({ isHome }) => {
    return (
        <div id="frontend-site">
            <FrontEndHeaderContainer />
            <FrontEndRoutes />

            {!isHome && <FrontEndFooter />}
        </div>
    );
};

export default FrontEndApp;

import React from 'react';

import FrontEndRoutes from '../../routes/presentational';
import FrontEndFooterContainer from 'components/frontEnd/layout/footer/containers/FrontEndFooterContainer';
import FrontEndHeaderContainer from 'components/frontEnd/layout/header/container/FrontEndHeaderContainer';

const FrontEndApp = ({ isHome }) => {
    return (
        <div id="frontend-site">
            <FrontEndHeaderContainer />
            <FrontEndRoutes />

            {!isHome && <FrontEndFooterContainer />}
        </div>
    );
};

export default FrontEndApp;

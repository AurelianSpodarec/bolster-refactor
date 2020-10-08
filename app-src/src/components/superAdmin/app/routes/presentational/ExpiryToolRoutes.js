import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import ExpiryTool from 'components/superAdmin/siteManagement/expiryTool/presentational/ExpiryTool';

const ExpiryToolRoutes = ({ base = '/admin/expiry-tool' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={ExpiryTool} />
    </SwitchWith404>
);

export default ExpiryToolRoutes;

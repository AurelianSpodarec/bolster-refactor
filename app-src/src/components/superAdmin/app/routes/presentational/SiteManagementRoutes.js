import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import SiteManagement from 'components/superAdmin/siteManagement/siteManagement/presentational/SiteManagement';

const SiteManagementRoutes = ({ base = '/admin/site-management' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={SiteManagement} />
    </SwitchWith404>
);

export default SiteManagementRoutes;

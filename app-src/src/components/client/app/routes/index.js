import React from 'react';
import { Route } from 'react-router-dom';

import Dashboard from 'components/client/dashboard/presentational/Dashboard';
import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';

import SitesRoutes from './SitesRoutes';
import BuildingsRoutes from './BuildingsRoutes';
import FloorRoutes from './FloorRoutes';
import DrawingsRoutes from './DrawingsRoutes';
import PinRoutes from './PinRoutes';
import ProfilesRoutes from './ProfilesRoutes';

// ? Should a client have access to report generation features?
// import ReportsRoutes from './ReportsRoutes';

const ClientAreaRoutes = ({ base = '/client' }) => (
    <SwitchWith404>
        <Route exact path={base} component={Dashboard} />
        <Route path={`${base}/sites`} component={SitesRoutes} />
        <Route path={`${base}/floors`} component={FloorRoutes} />
        <Route path={`${base}/buildings`} component={BuildingsRoutes} />
        <Route path={`${base}/drawings`} component={DrawingsRoutes} />

        <Route path={`${base}/pins`} component={PinRoutes} />
        <Route path={`${base}/profile`} component={ProfilesRoutes} />
    </SwitchWith404>
);

export default ClientAreaRoutes;

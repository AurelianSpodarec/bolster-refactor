import React from 'react';
import { Route } from 'react-router-dom';

import Dashboard from 'components/client/dashboard/presentational/Dashboard';
import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import withSelectedCompanyAuth from '../../app/hocs/withSelectedCompanyAuth';

import CompaniesRoutes from './CompaniesRoutes';
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
        <Route
            exact
            path={base}
            component={withSelectedCompanyAuth(Dashboard)}
        />
        <Route exact path={`${base}/companies`} component={CompaniesRoutes} />
        <Route
            path={`${base}/sites`}
            component={withSelectedCompanyAuth(SitesRoutes)}
        />
        <Route
            path={`${base}/floors`}
            component={withSelectedCompanyAuth(FloorRoutes)}
        />
        <Route
            path={`${base}/buildings`}
            component={withSelectedCompanyAuth(BuildingsRoutes)}
        />
        <Route
            path={`${base}/drawings`}
            component={withSelectedCompanyAuth(DrawingsRoutes)}
        />

        <Route
            path={`${base}/pins`}
            component={withSelectedCompanyAuth(PinRoutes)}
        />
        <Route
            path={`${base}/profile`}
            component={withSelectedCompanyAuth(ProfilesRoutes)}
        />

        {/* ? should clients have the option to generate reports  */}
        {/* <Route
            path={`${base}/reports`}
            component={ReportsRoutes}
        /> */}
    </SwitchWith404>
);

export default ClientAreaRoutes;

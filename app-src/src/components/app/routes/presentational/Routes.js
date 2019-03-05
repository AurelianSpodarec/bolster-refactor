import React from 'react';
import { Route } from 'react-router-dom';
import withShowLayout from 'components/layout/misc/hocs/withShowLayout';

import SwitchWith404 from './SwitchWith404';
import Dashboard from 'components/dashboard/dashboard/presentational/Dashboard';

import AuthRoutes from './AuthRoutes';
import SitesRoutes from './SitesRoutes';
import CreditLogRoutes from './CreditLogRoutes';
import MessagesRoutes from './MessagesRoutes';

const Routes = ({ showLoggedInLayout }) => (
    <div
        id="page-area"
        className={`size-lg-${showLoggedInLayout ? '8' : '12'}`}
    >
        <SwitchWith404>
            <Route exact path="/" component={Dashboard} />
            <Route path="/auth" component={AuthRoutes} />
            <Route path="/sites" component={SitesRoutes} />
            <Route path="/credit-log" component={CreditLogRoutes} />
            <Route path="/messages" component={MessagesRoutes} />
        </SwitchWith404>
    </div>
);

export default withShowLayout(Routes);

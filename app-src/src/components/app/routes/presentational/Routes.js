import React from 'react';

import withShowLayout from 'components/layout/misc/hocs/withShowLayout';

import AuthRoutes from './AuthRoutes';
import DashboardRoutes from './DashboardRoutes';
import SitesRoutes from './SitesRoutes';
import CreditLogRoutes from './CreditLogRoutes';
import MessagesRoutes from './MessagesRoutes';

const Routes = ({ showLoggedInLayout }) => (
    <div
        id="page-area"
        className={`size-lg-${showLoggedInLayout ? '8' : '12'}`}
    >
        <AuthRoutes />
        <DashboardRoutes />
        <SitesRoutes />
        <CreditLogRoutes />
        <MessagesRoutes />
    </div>
);

export default withShowLayout(Routes);

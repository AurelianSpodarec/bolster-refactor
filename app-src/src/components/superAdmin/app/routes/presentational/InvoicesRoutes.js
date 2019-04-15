import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import SuperAdminInvoicesContainer from 'components/superAdmin/invoices/containers/SuperAdminInvoicesContainer';

const CompaniesRoutes = ({ base = '/admin/invoices' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={SuperAdminInvoicesContainer} />
    </SwitchWith404>
);

export default CompaniesRoutes;

import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import SuperAdminInvoicesContainer from 'components/superAdmin/invoices/containers/SuperAdminInvoicesContainer';
import SingleInvoiceContainer from 'components/superAdmin/invoices/singleInvoice/containers/SingleInvoiceContainer';

const CompaniesRoutes = ({ base = '/admin/invoices' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={SuperAdminInvoicesContainer} />
        <Route
            exact
            path={`${base}/:companyID/:id`}
            component={SingleInvoiceContainer}
        />
    </SwitchWith404>
);

export default CompaniesRoutes;

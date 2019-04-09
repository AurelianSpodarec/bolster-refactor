import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import InvoicesContainer from 'components/companyAdmin/invoices/allInvoices/containers/InvoicesContainer';
import SingleInvoiceContainer from 'components/companyAdmin/invoices/singleInvoice/containers/SingleInvoiceContainer';

const InvoicesRoutes = ({ base = '/company/invoices' }) => (
    <SwitchWith404>
        <Route exact path={base} component={InvoicesContainer} />
        <Route exact path={`${base}/:id`} component={SingleInvoiceContainer} />
    </SwitchWith404>
);

export default InvoicesRoutes;

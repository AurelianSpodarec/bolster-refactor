import React from 'react';
import SuperAdminListItem from './SuperAdminListItem';

const SuperAdminInvoicesList = ({ invoices, showModal }) =>
    invoices.map(invoice => (
        <SuperAdminListItem
            key={invoice.id}
            invoice={invoice}
            showModal={showModal}
        />
    ));

export default SuperAdminInvoicesList;

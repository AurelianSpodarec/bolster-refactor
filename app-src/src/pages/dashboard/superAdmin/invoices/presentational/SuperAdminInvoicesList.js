import React from 'react';
import SuperAdminListItem from './SuperAdminListItem';

const SuperAdminInvoicesList = ({ invoices, showModal, companies }) =>
    invoices.map(invoice => (
        <SuperAdminListItem
            key={invoice.id}
            invoice={invoice}
            showModal={showModal}
            companies={companies}
        />
    ));

export default SuperAdminInvoicesList;

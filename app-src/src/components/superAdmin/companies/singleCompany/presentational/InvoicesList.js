import React from 'react';
import InvoiceListItem from './InvoiceListItem';

const InvoicesList = ({ invoices }) => {
    return invoices.map(invoice => (
        <InvoiceListItem key={invoice.id} invoice={invoice} />
    ));
};

export default InvoicesList;

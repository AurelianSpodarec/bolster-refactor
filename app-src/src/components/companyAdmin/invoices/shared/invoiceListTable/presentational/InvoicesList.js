import React from 'react';

import InvoiceListItem from '../presentational/InvoiceListItem';

const InvoiceList = ({ invoices }) =>
    invoices.map(invoice => (
        <InvoiceListItem key={invoice.id} invoice={invoice} />
    ));

export default InvoiceList;

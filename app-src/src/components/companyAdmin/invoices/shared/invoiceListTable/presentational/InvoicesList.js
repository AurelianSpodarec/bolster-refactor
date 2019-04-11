import React from 'react';

import InvoiceListItem from '../presentational/InvoiceListItem';

const InvoiceList = ({ invoices, showModal }) =>
    invoices.map(invoice => (
        <InvoiceListItem
            key={invoice.id}
            invoice={invoice}
            showModal={showModal}
        />
    ));

export default InvoiceList;

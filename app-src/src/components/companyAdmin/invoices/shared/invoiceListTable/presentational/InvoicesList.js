import React from 'react';

import InvoiceListItem from '../presentational/InvoiceListItem';

const InvoiceList = ({ invoices, showModal, headers, onMobile }) =>
    invoices.map(invoice => (
        <InvoiceListItem
            key={invoice.id}
            invoice={invoice}
            showModal={showModal}
            headers={headers}
            onMobile={onMobile}
        />
    ));

export default InvoiceList;

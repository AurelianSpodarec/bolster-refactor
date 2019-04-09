import React from 'react';

import InvoiceListItemContainer from '../containers/InvoiceListItemContainer';

const InvoiceList = ({ invoices, colCount }) =>
    invoices.map(invoice => (
        <InvoiceListItemContainer
            key={invoice.id}
            invoice={invoice}
            colCount={colCount}
        />
    ));

export default InvoiceList;

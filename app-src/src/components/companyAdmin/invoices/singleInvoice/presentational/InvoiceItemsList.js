import React from 'react';

import InvoiceItemsListSingleItem from './InvoiceItemsListSingleItem';

const InvoiceItemsList = ({ invoiceItems, colCount }) =>
    invoiceItems.map(item => (
        <InvoiceItemsListSingleItem
            key={item.id}
            item={item}
            colCount={colCount}
        />
    ));

export default InvoiceItemsList;

import React from 'react';

import InvoiceItemsListSingleItem from './InvoiceItemsListSingleItem';

const InvoiceItemsList = ({ invoiceItems, colCount, headers, onMobile }) =>
    invoiceItems.map(item => (
        <InvoiceItemsListSingleItem
            key={item.id}
            item={item}
            colCount={colCount}
            headers={headers}
            onMobile={onMobile}
        />
    ));

export default InvoiceItemsList;

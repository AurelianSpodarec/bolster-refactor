import React from 'react';

const InvoiceItemsListSingleItem = ({
    item: { serviceID, customName, quantity, itemPrice, itemVAT, total }
}) => (
    <tr>
        <td>{`##${serviceID}##`}</td>
        <td>{customName || 'N/A'}</td>
        <td>{quantity}</td>
        <td>{itemPrice.toFixed(2)}</td>
        <td>{itemVAT.toFixed(2)}</td>
        <td>{total.toFixed(2)}</td>
    </tr>
);

export default InvoiceItemsListSingleItem;

import React from 'react';
import { formatCurrency } from 'helpers/generic';

const InvoiceItemsListSingleItem = ({
    item: { description, customName, quantity, itemPrice, itemVAT, total }
}) => (
    <tr>
        <td>{`${description || ''}`}</td>
        <td>{customName || 'N/A'}</td>
        <td>{quantity}</td>
        <td>{`£${formatCurrency(itemPrice)}`}</td>
        <td>{`£${formatCurrency(itemVAT)}`}</td>
        <td>{`£${formatCurrency(total)}`}</td>
    </tr>
);

export default InvoiceItemsListSingleItem;

import React from 'react';
import { formatCurrency } from 'helpers/generic';

const InvoiceItemsListSingleItem = ({
    item: { description, customName, quantity, itemPrice, itemVAT, total },
    onMobile,
    headers
}) => (
    <tr>
        <td>
            {' '}
            {onMobile && (
                <span className="mobile-table-heading">{headers[0]}</span>
            )}
            {`${description || ''}`}
        </td>
        <td>
            {' '}
            {onMobile && (
                <span className="mobile-table-heading">{headers[1]}</span>
            )}
            {customName || 'N/A'}
        </td>
        <td>
            {onMobile && (
                <span className="mobile-table-heading">{headers[2]}</span>
            )}
            {quantity}
        </td>
        <td>
            {onMobile && (
                <span className="mobile-table-heading">{headers[3]}</span>
            )}
            {`£${formatCurrency(itemPrice)}`}
        </td>
        <td>
            {onMobile && (
                <span className="mobile-table-heading">{headers[4]}</span>
            )}
            {`£${formatCurrency(itemVAT)}`}
        </td>
        <td>
            {onMobile && (
                <span className="mobile-table-heading">{headers[5]}</span>
            )}
            {`£${formatCurrency(total * quantity)}`}
        </td>
    </tr>
);

export default InvoiceItemsListSingleItem;

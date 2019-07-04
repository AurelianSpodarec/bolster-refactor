import React from 'react';
import { formatCurrency } from 'helpers/generic';

const InvoiceItemsTotals = ({
    invoice: { subTotal, vatTotal, total },
    onMobile
}) => (
    <tr>
        {!onMobile && (
            <>
                {' '}
                <td>{''}</td>
                <td>{''}</td>
                <td>{''}</td>
            </>
        )}

        <td>{`Total (ex. VAT): £${formatCurrency(subTotal)} GBP`}</td>
        <td>{`VAT total: £${formatCurrency(vatTotal)} GBP`}</td>
        <td>{`Total (inc. VAT) £${formatCurrency(total)} GBP`}</td>
    </tr>
);

export default InvoiceItemsTotals;

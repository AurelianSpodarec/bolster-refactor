import React from 'react';

const InvoiceItemsTotals = ({ invoice: { subTotal, vatTotal, total } }) => (
    <tr>
        <td>{''}</td>
        <td>{''}</td>
        <td>{''}</td>
        <td>{`Total (ex. VAT): ${subTotal.toFixed(2)} GBP`}</td>
        <td>{`VAT total: ${vatTotal.toFixed(2)} GBP`}</td>
        <td>{`Total (inc. VAT) ${total.toFixed(2)} GBP`}</td>
    </tr>
);

export default InvoiceItemsTotals;

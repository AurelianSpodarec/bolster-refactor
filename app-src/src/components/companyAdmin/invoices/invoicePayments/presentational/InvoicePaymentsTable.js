import React from 'react';
import Table from 'components/shared/generic/tables/presentational/Table';
import { formatCurrency } from 'helpers/generic';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

const InvoicePaymentsTable = ({ payments, headers, onMobile }) => (
    <Table
        headers={headers}
        noData={!payments.length}
        noDataMessage="No payments to display for this invoice"
        withActions
    >
        {payments.map(payment => (
            <tr key={payment.id}>
                <td>
                    {' '}
                    {onMobile && (
                        <span className="mobile-table-heading">
                            {headers[0]}
                        </span>
                    )}
                    £{formatCurrency(payment.amount)}
                </td>
                <td>
                    {' '}
                    {onMobile && (
                        <span className="mobile-table-heading">
                            {headers[1]}
                        </span>
                    )}
                    <DateTimeContainer date={payment.createdOn} />
                </td>
            </tr>
        ))}
    </Table>
);

export default InvoicePaymentsTable;

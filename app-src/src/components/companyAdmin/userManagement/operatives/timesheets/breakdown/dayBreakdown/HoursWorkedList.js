import React from 'react';

import { formatCurrency } from 'helpers/generic';
import moment from 'moment';

const HoursWorkedList = ({
    jobReferences = [],
    jobReferencesTotalHours,
    jobReferencesTotalCost,
    currencySymbol = '£',
}) => (
    <>
        {jobReferences.map(({ jobRef, hoursWorked, wageSplit }, i) => {
            return (
                <tr key={i}>
                    <td>{jobRef || '-'}</td>
                    <td>{moment(hoursWorked).format('H:mm')}</td>
                    <td>
                        {currencySymbol}
                        {wageSplit ? formatCurrency(wageSplit) : '0.00'}
                    </td>
                </tr>
            );
        })}
        <tr className="total-row">
            <td>Total</td>
            <td>{moment(jobReferencesTotalHours).format('H:mm')}</td>
            <td>
                {currencySymbol}
                {jobReferencesTotalCost ? formatCurrency(jobReferencesTotalCost) : '0.00'}
            </td>
        </tr>
    </>
);

export default HoursWorkedList;

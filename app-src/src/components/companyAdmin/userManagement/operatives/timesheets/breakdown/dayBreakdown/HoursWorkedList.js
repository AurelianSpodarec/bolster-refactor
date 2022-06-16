import React from 'react';

import { formatCurrency } from 'helpers/generic';

const HoursWorkedList = ({
    jobReferences = [],
    jobReferencesTotalHours,
    jobReferencesTotalCost,
    currencySymbol = '£',
}) => (
    <>
        {jobReferences.map((jobRef, i) => {
            return (
                <tr key={i}>
                    <td>{jobRef.jobRef}</td>
                    <td>{jobRef.hoursWorked}</td>
                    <td>
                        {currencySymbol}
                        {formatCurrency(jobRef.wageSplit)}
                    </td>
                </tr>
            );
        })}
        <tr>
            <td>Total</td>
            <td>{jobReferencesTotalHours}</td>
            <td>
                {currencySymbol}
                {formatCurrency(jobReferencesTotalCost)}
            </td>
        </tr>
    </>
);

export default HoursWorkedList;

import React from 'react';

import { formatCurrency } from 'helpers/generic';
import moment from 'moment';
import TimePickerContainer from 'components/shared/generic/form/containers/TimePickerContainer';
import CurrencyInput from 'components/shared/generic/form/presentational/CurrencyInput';

const HoursWorkedList = ({
    jobReferences = [],
    jobReferencesTotalHours,
    jobReferencesTotalCost,
    currencySymbol = '£',
    formData,
    handleChange,
    isEditing,
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
            <td>
                {isEditing ? (
                    <TimePickerContainer
                        value={formData.overrideShiftTime}
                        name="overrideShiftTime"
                        handleChange={handleChange}
                        required={false}
                        extraClasses="table-time-input"
                        disableClock={true}
                        format={'HH:mm'}
                        clearIcon={null}
                    />
                ) : (
                    moment(jobReferencesTotalHours).format('H:mm')
                )}
            </td>
            <td>
                {isEditing ? (
                    <CurrencyInput
                        name="overrideWage"
                        value={formData.overrideWage}
                        handleChange={handleChange}
                    />
                ) : (
                    `${currencySymbol}${
                        jobReferencesTotalCost ? formatCurrency(jobReferencesTotalCost) : '0.00'
                    }`
                )}
            </td>
        </tr>
    </>
);

export default HoursWorkedList;

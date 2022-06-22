import React from 'react';
import moment from 'moment';
import { formatCurrency } from 'helpers/generic';

import TimePickerContainer from 'components/shared/generic/form/containers/TimePickerContainer';
import CurrencyInput from 'components/shared/generic/form/presentational/CurrencyInput';

const HoursWorkedList = ({
    jobReferences = [],
    jobReferencesTotalHours,
    jobReferencesTotalCost,
    overrideWage,
    overrideShiftTime,
    currencySymbol = '£',
    formData,
    handleChange,
    isEditing,
}) => {
    return (
        <>
            {jobReferences.map(({ jobRef, jobRefID, hoursWorked, wageSplit }, i) => {
                return (
                    <tr key={`${i}-${jobRefID}`}>
                        <td>{jobRef || '-'} </td>
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
                            handleChange={val => handleChange('overrideShiftTime', val)}
                            required={false}
                            extraClasses="table-time-input"
                            disableClock={true}
                            format={'HH:mm'}
                            clearIcon={null}
                        />
                    ) : overrideShiftTime ? (
                        overrideShiftTime.split(':').slice(0, 2).join(':')
                    ) : (
                        moment(jobReferencesTotalHours).format('H:mm')
                    )}
                </td>
                <td>
                    {isEditing ? (
                        <CurrencyInput
                            name="overrideWage"
                            value={formData.overrideWage}
                            onChange={handleChange}
                        />
                    ) : overrideWage !== null ? (
                        `${currencySymbol}${formatCurrency(overrideWage)}`
                    ) : (
                        `${currencySymbol}${
                            jobReferencesTotalCost ? formatCurrency(jobReferencesTotalCost) : '0.00'
                        }`
                    )}
                </td>
            </tr>
        </>
    );
};

export default HoursWorkedList;

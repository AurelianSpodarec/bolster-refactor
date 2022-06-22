import React from 'react';

import { formatCurrency } from 'helpers/generic';
import moment from 'moment';
import TimePickerContainer from 'components/shared/generic/form/containers/TimePickerContainer';
import CurrencyInput from 'components/shared/generic/form/presentational/CurrencyInput';
import { CLOCKER_ENTRY_TYPE } from 'constants/companyAdmin/enums';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';

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
}) => (
    <>
        {jobReferences.map(({ uid, jobRef, type, hoursWorked, wageSplit }, i) => {
            const isWorking = type === CLOCKER_ENTRY_TYPE.WORKING;

            return (
                <tr key={i}>
                    <td>
                        <FlexWrapper align="center">
                            <span style={{ marginRight: isWorking ? 5 : 0 }}>{jobRef || '-'} </span>

                            {isWorking && (
                                <ActionButton icon="pencil" iconOnly source="secondary" />
                            )}
                        </FlexWrapper>
                    </td>
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
                ) : !Number.isNaN(overrideWage) ? (
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

export default HoursWorkedList;

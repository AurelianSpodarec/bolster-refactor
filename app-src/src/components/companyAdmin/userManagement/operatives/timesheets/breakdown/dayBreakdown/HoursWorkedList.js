import React from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { formatCurrency } from 'helpers/generic';
import { AMEND_JOB_REFERENCE_MODAL } from 'constants/shared/modalTypes';

import showModal from 'actions/shared/generic/modals/sync/showModal';

import TimePickerContainer from 'components/shared/generic/form/containers/TimePickerContainer';
import CurrencyInput from 'components/shared/generic/form/presentational/CurrencyInput';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';

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
    const dispatch = useDispatch();

    return (
        <>
            {jobReferences.map(({ jobRef, jobRefID, hoursWorked, wageSplit }, i) => {
                return (
                    <tr key={`${i}-${jobRefID}`}>
                        <td>
                            <FlexWrapper align="center">
                                <span style={{ marginRight: 5 }}>{jobRef || '-'}</span>
                                <ActionButton
                                    icon="pencil"
                                    iconOnly
                                    source="secondary"
                                    onClick={() =>
                                        dispatch(showModal(AMEND_JOB_REFERENCE_MODAL, { jobRefID }))
                                    }
                                />
                            </FlexWrapper>{' '}
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

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { formatAsHrsMins, formatCurrency } from 'helpers/generic';
import { AMEND_JOB_REFERENCE_MODAL } from 'constants/shared/modalTypes';

import showModal from 'actions/shared/generic/modals/sync/showModal';
import { selectCompanySettings } from 'selectors/companyAdmin/companySettings';

import TimePickerContainer from 'components/shared/generic/form/containers/TimePickerContainer';
import CurrencyInput from 'components/shared/generic/form/presentational/CurrencyInput';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import useIsAdminPlus from '../../../../../../../hooks/useIsAdminPlus';

const HoursWorkedList = ({
    shiftID,
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
    const companySettings = useSelector(selectCompanySettings);

    const isAdminPlus = useIsAdminPlus();

    const isJobRefDropdownEnabled = companySettings.isJobReferenceDropdownEnabled;

    return (
        <>
            {jobReferences.map(({ jobRef, jobRefID, hoursWorked, wageSplit }, i) => {
                return (
                    <tr key={`${i}-${jobRefID}`}>
                        <td>
                            <FlexWrapper align="center">
                                <span style={{ marginRight: isJobRefDropdownEnabled ? 5 : 0 }}>
                                    {jobRef || '-'}
                                </span>
                                {isJobRefDropdownEnabled && (
                                    <ActionButton
                                        icon="pencil"
                                        iconOnly
                                        source="secondary"
                                        onClick={() =>
                                            dispatch(
                                                showModal(AMEND_JOB_REFERENCE_MODAL, {
                                                    shiftID,
                                                    oldJobRefID: jobRefID,
                                                }),
                                            )
                                        }
                                    />
                                )}
                            </FlexWrapper>{' '}
                        </td>
                        <td>{formatAsHrsMins(hoursWorked)}</td>
                        {isAdminPlus && (
                            <td>
                                {currencySymbol}
                                {wageSplit ? formatCurrency(wageSplit) : '0.00'}
                            </td>
                        )}
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
                        formatAsHrsMins(jobReferencesTotalHours)
                    )}
                </td>
                {isAdminPlus && (
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
                                jobReferencesTotalCost
                                    ? formatCurrency(jobReferencesTotalCost)
                                    : '0.00'
                            }`
                        )}
                    </td>
                )}
            </tr>
        </>
    );
};

export default HoursWorkedList;

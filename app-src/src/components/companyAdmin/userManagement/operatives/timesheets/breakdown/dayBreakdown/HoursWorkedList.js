import React from 'react';
import { useDispatch } from 'react-redux';

import { formatAsHrsMins, formatCurrency } from 'helpers/generic';
import { AMEND_JOB_REFERENCE_MODAL } from 'constants/shared/modalTypes';

import showModal from 'actions/shared/generic/modals/sync/showModal';

import TimePickerContainer from 'components/shared/generic/form/containers/TimePickerContainer';
import CurrencyInput from 'components/shared/generic/form/presentational/CurrencyInput';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import useIsAdminPlus from '../../../../../../../hooks/useIsAdminPlus';
import TooltipContainer from 'components/shared/generic/tooltip/containers/TooltipContainer';
import WarningIcon from '../../../../../../../assets/images/icons/Triangle_Warning.svg';

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

    const isAdminPlus = useIsAdminPlus();

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
                                    extraClasses="typography-default-colour"
                                    onClick={() =>
                                        dispatch(
                                            showModal(AMEND_JOB_REFERENCE_MODAL, {
                                                shiftID,
                                                oldJobRefID: jobRefID,
                                            }),
                                        )
                                    }
                                />
                            </FlexWrapper>
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
                        <FlexWrapper align="center">
                            {overrideShiftTime.split(':').slice(0, 2).join(':')}
                            <TooltipContainer side="right" text="Total hours data has been edited.">
                                <img alt="Warning Icon" src={WarningIcon} />
                            </TooltipContainer>
                        </FlexWrapper>
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
                            <FlexWrapper align="center">
                                {currencySymbol}
                                <>
                                    {formatCurrency(overrideWage)}
                                    <TooltipContainer
                                        side="right"
                                        text="Total wage data has been edited."
                                    >
                                        <img alt="Warning Icon" src={WarningIcon} />
                                    </TooltipContainer>
                                </>
                            </FlexWrapper>
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

import React from 'react';
import { CURRENCY_SYMBOLS, SHIFT_STATUS, SHIFT_STATUS_REVERSE } from 'constants/companyAdmin/enums';
import { formatAsHrsMins, formatCurrency } from 'helpers/generic';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { selectCompanyCurrency } from 'selectors/companyAdmin/companySettings';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import ActionMenu from 'components/shared/actionMenu/ActionMenu';
import ActionMenuActionButton from 'components/shared/actionMenu/ActionMenuActionButton';
import TooltipContainer from 'components/shared/generic/tooltip/containers/TooltipContainer';
import ApproveShiftButton from '../breakdown/dayBreakdown/ApproveShiftButton';
import useBolsterPlus from 'components/companyAdmin/subscription/addOns/hooks/useBolsterPlus';
import ApproveShiftMenuButton from '../breakdown/dayBreakdown/ApproveShiftMenuButton';
import RejectShiftMenuButton from '../breakdown/dayBreakdown/RejectShiftMenuButton';
import useDeleteShift from '../breakdown/hooks/useDeleteShift';
import WarningIcon from '../../../../../../_content/images/icons/Triangle_Warning.svg';

const DayShiftsItems = ({ shiftsForDay, onDaySelect }) => {
    const currency = useSelector(selectCompanyCurrency);
    const currencySymbol = CURRENCY_SYMBOLS[currency];
    const { isBolsterPlusActivated } = useBolsterPlus();

    const { handleShowDeleteShiftModal } = useDeleteShift(shiftsForDay);

    const handleViewTimesheet = timestamp => {
        onDaySelect(timestamp);
    };

    return (
        <>
            {shiftsForDay.map((shift, i) => {
                const {
                    companyUserID,
                    username,
                    // formattedHours,
                    formattedClockedInHours,
                    formattedBreakHours,
                    // overrideWage,
                    // overrideShiftTime,
                    wage,
                    totalPins,
                    hoursBreakdown,
                    startOn,
                    endOn,
                    lateClockIn,
                    lateClockOut,
                    id,
                    status,
                    isShiftTimeOverridden,
                    isWageOverridden,
                } = shift;

                const jobReferences = hoursBreakdown.jobReferenceBreakdowns
                    .map(({ jobReferenceName }) => jobReferenceName)
                    .filter(name => name !== 'N/A');

                return (
                    <tr key={`${i}-${companyUserID}`}>
                        <td>{username}</td>
                        <td>
                            {formatAsHrsMins(formattedClockedInHours)}
                            {isShiftTimeOverridden && (
                                <TooltipContainer
                                    side="right"
                                    text="Total hours data has been edited."
                                >
                                    <img
                                        alt="Warning Icon"
                                        src={WarningIcon}
                                        style={{ top: '5px' }}
                                    />
                                </TooltipContainer>
                            )}
                        </td>
                        <td>
                            {currencySymbol}
                            {wage ? formatCurrency(wage) : '0.00'}
                            {isWageOverridden && (
                                <TooltipContainer
                                    side="right"
                                    text="Total wage data has been edited."
                                >
                                    <img
                                        alt="Warning Icon"
                                        src={WarningIcon}
                                        style={{ top: '5px' }}
                                    />
                                </TooltipContainer>
                            )}
                        </td>
                        <td>
                            {moment(startOn).format('HH:mm')}
                            {lateClockIn && (
                                <TooltipContainer side="right" text="Operative started shift late.">
                                    <img
                                        alt="Warning Icon"
                                        src={WarningIcon}
                                        style={{ top: '5px' }}
                                    />
                                </TooltipContainer>
                            )}
                        </td>
                        <td>
                            {endOn ? moment(endOn).format('HH:mm') : 'N/A'}
                            {lateClockOut && (
                                <TooltipContainer side="right" text="Operative ended shift late.">
                                    <img
                                        alt="Warning Icon"
                                        src={WarningIcon}
                                        style={{ top: '5px' }}
                                    />
                                </TooltipContainer>
                            )}
                        </td>
                        <td>{formatAsHrsMins(formattedBreakHours)}</td>
                        <td>{totalPins}</td>
                        <td>{jobReferences.length ? jobReferences.join(', ') : 'N/A'}</td>
                        <td>
                            <ButtonWrapper alignment="right">
                                {isBolsterPlusActivated && status === SHIFT_STATUS.PENDING ? (
                                    <ApproveShiftButton shiftID={id} />
                                ) : isBolsterPlusActivated && status !== SHIFT_STATUS.PENDING ? (
                                    <ActionButton
                                        size="small"
                                        source="secondary"
                                        text={SHIFT_STATUS_REVERSE[status]}
                                        disabled
                                    />
                                ) : null}
                                {isBolsterPlusActivated ? (
                                    <ActionMenu size="small">
                                        <ActionMenuActionButton
                                            text="View Timesheet"
                                            onClick={() => handleViewTimesheet(startOn)}
                                        />
                                        {status !== SHIFT_STATUS.APPROVED && (
                                            <ApproveShiftMenuButton shiftID={id} />
                                        )}
                                        {status !== SHIFT_STATUS.REJECTED && (
                                            <RejectShiftMenuButton shiftID={id} />
                                        )}
                                        <ActionMenuActionButton
                                            text="Delete"
                                            onClick={() => handleShowDeleteShiftModal(shift.id)}
                                            isNegative
                                        />
                                    </ActionMenu>
                                ) : (
                                    <TooltipContainer
                                        side="left"
                                        text="Delete and approve/reject is available through Bolster Plus."
                                    >
                                        <ActionMenu size="small" disabled={true}>
                                            {status !== SHIFT_STATUS.APPROVED && (
                                                <ApproveShiftMenuButton shiftID={shift.id} />
                                            )}
                                            {status !== SHIFT_STATUS.REJECTED && (
                                                <RejectShiftMenuButton shiftID={shift.id} />
                                            )}
                                            <ActionMenuActionButton
                                                text="Delete"
                                                onClick={() => handleShowDeleteShiftModal(shift.id)}
                                                isNegative
                                            />
                                        </ActionMenu>
                                    </TooltipContainer>
                                )}
                            </ButtonWrapper>
                        </td>
                    </tr>
                );
            })}
        </>
    );
};

export default DayShiftsItems;

import React from 'react';
import { CURRENCY_SYMBOLS } from 'constants/companyAdmin/enums';
import { formatAsHrsMins, formatCurrency } from 'helpers/generic';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { selectCompanyCurrency } from 'selectors/companyAdmin/companySettings';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import ActionMenu from 'components/shared/actionMenu/ActionMenu';
import ActionMenuActionButton from 'components/shared/actionMenu/ActionMenuActionButton';

const DayShiftsItems = ({ shiftsForDay }) => {
    const currency = useSelector(selectCompanyCurrency);
    const currencySymbol = CURRENCY_SYMBOLS[currency];

    return (
        <>
            {shiftsForDay.map((shift, i) => {
                const {
                    companyUserID,
                    username,
                    // formattedHours,
                    formattedClockedInHours,
                    formattedBreakHours,
                    lastClockedOutTime,
                    // overrideWage,
                    // overrideShiftTime,
                    wage,
                    totalPins,
                    hoursBreakdown,
                    startOn,
                    endOn,
                    lateClockIn,
                    lateClockOut,
                    // id,
                } = shift;

                const jobReferences = hoursBreakdown.jobReferenceBreakdowns
                    .map(({ jobReferenceName }) => jobReferenceName)
                    .filter(name => name !== 'N/A');

                return (
                    <tr key={`${i}-${companyUserID}`}>
                        <td>{username}</td>
                        <td>{formatAsHrsMins(formattedClockedInHours)}</td>
                        <td>
                            {currencySymbol}
                            {wage ? formatCurrency(wage) : '0.00'}
                        </td>
                        <td>
                            {moment(startOn).format('HH:mm')}
                            {lateClockIn && (
                                <i className="fa fa-exclamation-triangle timesheet-warning" />
                            )}
                        </td>
                        <td>
                            {endOn ? moment(endOn).format('HH:mm') : 'N/A'}
                            {lateClockOut && (
                                <i className="fa fa-exclamation-triangle timesheet-warning" />
                            )}
                        </td>
                        <td>{formatAsHrsMins(formattedBreakHours)}</td>
                        <td>{totalPins}</td>
                        <td>{jobReferences.length ? jobReferences.join(', ') : 'N/A'}</td>
                        <td>
                            <ButtonWrapper alignment="right">
                                <ActionButton
                                    source="primary"
                                    ambient="positive"
                                    size="small"
                                    text="Approve"
                                />
                                <ActionMenu>
                                    <ActionMenuActionButton
                                        text="View Timesheet"
                                        onClick={() => {}}
                                    />
                                    <ActionMenuActionButton text="Edit" onClick={() => {}} />
                                    <ActionMenuActionButton
                                        text="Delete"
                                        onClick={() => {}}
                                        isNegative
                                    />
                                </ActionMenu>
                            </ButtonWrapper>
                        </td>
                    </tr>
                );
            })}
        </>
    );
};

export default DayShiftsItems;

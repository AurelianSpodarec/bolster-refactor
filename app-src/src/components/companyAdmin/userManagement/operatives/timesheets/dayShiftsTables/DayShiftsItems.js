import React from 'react';
import { CURRENCY_SYMBOLS } from 'constants/companyAdmin/enums';
import { formatAsHrsMins, formatCurrency } from 'helpers/generic';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { selectCompanyCurrency } from 'selectors/companyAdmin/companySettings';

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
                    // overrideWage,
                    // overrideShiftTime,
                    wage,
                    totalPins,
                    hoursBreakdown,
                    startOn,
                    endOn,
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
                        <td>{moment(startOn).format('HH:mm')}</td>
                        <td>{endOn ? moment(endOn).format('HH:mm') : 'N/A'}</td>
                        <td>{formatAsHrsMins(formattedBreakHours)}</td>
                        <td>{totalPins}</td>
                        <td>{jobReferences.length ? jobReferences.join(', ') : 'N/A'}</td>
                        <td></td>
                    </tr>
                );
            })}
        </>
    );
};

export default DayShiftsItems;

import { CURRENCY_SYMBOLS } from 'constants/companyAdmin/enums';
import { formatAsHrsMins, formatCurrency } from 'helpers/generic';
import moment from 'moment';
import React from 'react';
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
                    formattedHours,
                    formattedClockedInHours,
                    formattedBreakHours,
                    overrideWage,
                    overrideShiftTime,
                    wage,
                    totalPins,
                    hoursBreakdown,
                    startOn,
                    endOn,
                    id,
                } = shift;

                return (
                    <tr key={`${i}-${companyUserID}`}>
                        <td>{username}</td>
                        <td>{formatAsHrsMins(formattedClockedInHours)}</td>
                        <td>
                            {currencySymbol}
                            {formatCurrency(wage)}
                        </td>
                        <td>{moment(startOn).format('HH:mm')}</td>
                        <td>{moment(endOn).format('HH:mm')}</td>
                        <td>{formatAsHrsMins(formattedBreakHours)}</td>
                        <td>{totalPins}</td>
                        <td></td>
                    </tr>
                );
            })}
        </>
    );
};

export default DayShiftsItems;

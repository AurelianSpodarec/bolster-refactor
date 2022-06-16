import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectFilterByHasClockedIn } from 'selectors/companyAdmin/timesheets';

import { timesheetFilter, timesheetSort } from './hooks/useOverviewFilters';
import { timesheetSelectedCompanyIDs } from 'selectors/companyAdmin/timesheets';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import moment from 'moment';
import getShiftPodData from '../../helpers/getShiftPodData';
import { selectCompanyUsers } from 'selectors/companyAdmin/companyUsers';
import { CURRENCY_SYMBOLS, SHIFT_STATUS, SHIFT_STATUS_REVERSE } from 'constants/companyAdmin/enums';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import {
    selectCompanyCurrency,
    selectCompanyTimeZone,
} from 'selectors/companyAdmin/companySettings';
import Table from 'components/shared/generic/tables/presentational/Table';
import HoursWorkedList from './HoursWorkedList';
import ExpensesList from './ExpensesList';
import { formatCurrency, isEmpty } from 'helpers/generic';

const BreakdownOverviewList = ({ timesheets, selectedDate, filterType, filterDirection }) => {
    const selectedUserIDs = useSelector(timesheetSelectedCompanyIDs);
    const filterByHasClockedIn = useSelector(selectFilterByHasClockedIn);
    const users = useSelector(selectCompanyUsers);
    const timeZone = useSelector(selectCompanyTimeZone);
    const currency = useSelector(selectCompanyCurrency);
    const currencySymbol = CURRENCY_SYMBOLS[currency];

    const shiftsForToday = useMemo(
        () =>
            timesheets.reduce((acc, curr) => {
                const thisDay = curr.days.find(day => moment(day.date).isSame(selectedDate, 'day'));
                const todaysShifts = thisDay.shifts.map(shift => {
                    const notes = thisDay.clockerNotes.filter(note =>
                        moment(note.createdOn).isSame(selectedDate, 'day'),
                    );
                    return { ...shift, notes };
                });
                return [...acc, ...todaysShifts];
            }, []),
        [selectedDate, timesheets],
    );

    // let formattedTimesheets = [];

    // if (filterByHasClockedIn && selectedUserIDs.length === 0) {
    //     formattedTimesheets = timesheets
    //         .filter(timesheetFilter(filterByHasClockedIn, selectedDate))
    //         .sort(timesheetSort(filterType, filterDirection, selectedDate));
    // }

    // if (!filterByHasClockedIn && selectedUserIDs.length === 0) {
    //     formattedTimesheets = timesheets.sort(
    //         timesheetSort(filterType, filterDirection, selectedDate),
    //     );
    // }

    // if (selectedUserIDs.length) {
    //     formattedTimesheets = timesheets
    //         .filter(({ companyUserID }) => selectedUserIDs.includes(companyUserID))
    //         .sort(timesheetSort(filterType, filterDirection, selectedDate));
    // }

    if (isEmpty(shiftsForToday) || !shiftsForToday?.length)
        return <p>No clock in data to display.</p>;

    console.log({ timesheets, selectedDate, shiftsForToday, users });

    return shiftsForToday.map(shift => {
        const user = users[shift.companyUserID] || {};

        const {
            timeIn,
            timeOut,
            breakTime,
            noOfHistories,
            jobReferences, // [{ jobRef, hoursWorked, wageSplit }]
            jobReferencesTotalHours,
            jobReferencesTotalCost,
            expenses, // [{ name, cost }]
            expensesTotal,
            shiftTotal,
            notes,
            status,
            groupUID,
        } = getShiftPodData(shift);

        const statusClassLookup = {
            [SHIFT_STATUS.PENDING]: 'pending',
            [SHIFT_STATUS.APPROVED]: 'approved',
            [SHIFT_STATUS.REJECTED]: 'rejected',
        };

        return (
            <BlockContainer key={shift.id} contentClass={`shift-pod ${statusClassLookup[status]}`}>
                <BlockHeading
                    title={`${user.userFirstName} ${user.userLastName} (${user.userEmail})`}
                >
                    <ButtonWrapper alignment="right">
                        {status === SHIFT_STATUS.PENDING ? (
                            <ActionButton size="small" ambient="positive" text={'Approve'} />
                        ) : (
                            <ActionButton
                                size="small"
                                source="secondary"
                                text={SHIFT_STATUS_REVERSE[status]}
                                disabled
                            />
                        )}
                        <ActionButton size="small" source="secondary" icon="pencil" iconOnly />
                        <ActionButton size="small" ambient="negative" icon="trash" iconOnly />
                    </ButtonWrapper>
                </BlockHeading>
                <div className="divider" />
                <div className="pod-row">
                    <BlockContainer contentClass="inner-pod">
                        <BlockHeading title="Time In" />
                        <p>{moment.utc(timeIn).tz(timeZone).format('HH:mm:ss')}</p>
                    </BlockContainer>
                    <BlockContainer contentClass="inner-pod">
                        <BlockHeading title="Time Out" />
                        <p>{moment.utc(timeOut).tz(timeZone).format('HH:mm:ss')}</p>
                    </BlockContainer>
                    <BlockContainer contentClass="inner-pod">
                        <BlockHeading title="Break Time" />
                        <p>{moment.utc(breakTime).tz(timeZone).format('HH:mm:ss')}</p>
                    </BlockContainer>
                    <BlockContainer contentClass="inner-pod">
                        <BlockHeading title="Histories" />
                        <p>{noOfHistories}</p>
                    </BlockContainer>
                </div>
                <BlockContainer contentClass="inner-pod">
                    <BlockHeading title="Hours" />
                    <div className="divider" />
                    <div className="table-container">
                        <Table
                            headers={['Job References', 'Hours Worked', 'Wage Split']}
                            isFetching={false}
                            error={null}
                            noData={!jobReferences.length}
                            noDataMessage="No jobs to display."
                        >
                            <HoursWorkedList
                                jobReferences={jobReferences}
                                jobReferencesTotalCost={jobReferencesTotalCost}
                                jobReferencesTotalHours={jobReferencesTotalHours}
                                currencySymbol={currencySymbol}
                            />
                        </Table>
                    </div>

                    <BlockHeading title="Expenses" />
                    <div className="divider" />
                    <div className="table-container">
                        <Table
                            headers={['', '']}
                            isFetching={false}
                            error={null}
                            noData={!expenses.length}
                            noDataMessage="No expenses to display."
                        >
                            <ExpensesList
                                expenses={expenses}
                                expensesTotal={expensesTotal}
                                currencySymbol={currencySymbol}
                            />
                        </Table>
                        <ButtonWrapper alignment="right">
                            <ActionButton
                                size="small"
                                icon="plus"
                                text="Create new"
                                onClick={() => {}}
                            />
                        </ButtonWrapper>
                    </div>
                    <div className="shift-total">
                        <span>Total exc VAT:</span>
                        <span className="total">
                            {currencySymbol}
                            {formatCurrency(shiftTotal) || '0.00'}
                        </span>
                    </div>
                </BlockContainer>
                <BlockContainer contentClass="inner-pod">
                    <BlockHeading title="Notes" />
                    <div className="divider" />
                    {notes.map(note => (
                        <p key={note.uid}>{note.comments}</p>
                    ))}
                </BlockContainer>
            </BlockContainer>
        );
    });
};

// <div className="day" key={companyUserID}>
//     <BreakdownSummary
//         name={`${firstName} ${lastName} (${email})`}
//         formattedHours={formattedHours}
//         formattedBreakHours={formattedBreakHours}
//         formattedClockedInHours={formattedClockedInHours}
//         totalPins={totalPins}
//         clockIn={clockIn}
//         clockOut={clockOut}
//         jobReferenceIDs={jobReferenceIDs}
//     />
//     <BreakdownNotes notes={clockerNotes} />
// </div>

export default BreakdownOverviewList;

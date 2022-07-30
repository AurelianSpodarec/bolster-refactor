import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
// import DashboardPinFeed from 'components/companyAdmin/dashboard/presentational/DashboardPinFeed';
// import BreakdownColumns from '../BreakdownColumns';
// import usePinFeed from '../../hooks/usePinFeed';
// import BreakdownSummary from '../BreakdownSummary';
// import useWeekOverview from '../../hooks/useWeekOverview';
// import { DATE_TIME_IDS, TIME_PERIOD } from 'constants/companyAdmin/enums';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
// import PieChart from 'components/shared/stats/presentational/PieChart';
// import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { isEmpty } from 'helpers/generic';
// import usePinStats from '../../hooks/usePinStats';
// import moment from 'moment';
// import BreakdownNotes from '../BreakdownNotes';
import BreakdownOverviewFilters from '../../breakdown/dayBreakdown/BreakdownOverviewFilters';
import useOverviewFilters from '../../breakdown/dayBreakdown/hooks/useOverviewFilters';
// import {
//     selectFilterByHasClockedIn,
//     timesheetSelectedCompanyIDs,
// } from 'selectors/companyAdmin/timesheets';
import { days } from 'constants/companyAdmin/timesheets';
import { selectCompanyUsers } from 'selectors/companyAdmin/companyUsers';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import DayShiftsTable from '../../dayShiftsTables/DayShiftsTable';

const WeekBreakdownOverview = ({
    // selectedDate,
    timesheets,
    isFetching,
    fetchError,
    disableReportGenPin,
    handlePDFReportGeneration,
    // weeklyHoursBreakdown,
    // dailyHoursBreakdown,
    onDaySelect,
}) => {
    // const userIDs = useSelector(timesheetSelectedCompanyIDs);
    const companyUsers = useSelector(selectCompanyUsers);
    // const filterByHasClockedIn = useSelector(selectFilterByHasClockedIn);
    // const isSingleUser = userIDs.length === 1;

    const shiftsByDay = useMemo(
        () =>
            timesheets.reduce((acc, { companyUserID, days }) => {
                const thisUser = companyUsers[companyUserID];
                days.forEach((day, i) => {
                    const { shifts } = day;
                    const formattedShifts = shifts.map(shift => ({
                        ...shift,
                        username: `${thisUser.userFirstName} ${thisUser.userLastName}`,
                    }));
                    if (acc[i]) {
                        acc[i] = [...acc[i], ...formattedShifts];
                    } else {
                        acc[i] = [...formattedShifts];
                    }
                });
                return acc;
            }, new Array(7)),
        [timesheets],
    );

    // const {
    //     isFetching: statsIsFetching,
    //     fetchError: statsFetchError,
    //     stats,
    // } = usePinStats(
    //     userIDs,
    //     moment(selectedDate).format('YYYY-MM-DDTHH:mm:ss'),
    //     moment(selectedDate).endOf('week').format('YYYY-MM-DDTHH:mm:ss'),
    // );

    const {
        formState: { filterType, filterDirection },
        handleChange,
    } = useOverviewFilters();

    // const {
    //     isFetching: feedIsFetching,
    //     fetchError: feedFetchError,
    //     feed,
    // } = usePinFeed(userIDs, moment(selectedDate).format('YYYY-MM-DDTHH:mm:ss'), true);

    // const singleUserTimesheet = timesheets.find(
    //     timesheet => timesheet.companyUserID === userIDs[0],
    // );

    // const {
    //     companyUserID,
    //     firstName,
    //     lastName,
    //     email,
    //     formattedHours,
    //     formattedBreakHours,
    //     jobReferenceIDs,
    //     totalPins,
    //     clockerNotes,
    // } = useWeekOverview(singleUserTimesheet);

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem 0' }}>
                <button
                    className={`button ${disableReportGenPin ? 'disabled' : ''}`}
                    onClick={handlePDFReportGeneration}
                    disabled={disableReportGenPin}
                >
                    <i className="fas fa-file-pdf" />
                    Generate Report
                </button>
            </div>
            <BreakdownOverviewFilters
                filterType={filterType}
                filterDirection={filterDirection}
                handleChange={handleChange}
            />
            <div style={{ minHeight: '20px' }} />
            {shiftsByDay.map((shiftsForDay, i) => (
                <BlockContainer
                    key={i}
                    contentClass="inner-pod"
                    isFetching={isFetching}
                    error={fetchError}
                    isEmpty={isEmpty(timesheets)}
                >
                    <BlockHeading title={days[i]} />
                    <DayShiftsTable shiftsForDay={shiftsForDay} onDaySelect={onDaySelect} />
                </BlockContainer>
            ))}
        </>
    );
};

export default WeekBreakdownOverview;

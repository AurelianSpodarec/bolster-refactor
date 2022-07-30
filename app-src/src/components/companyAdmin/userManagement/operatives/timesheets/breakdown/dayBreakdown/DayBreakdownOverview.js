import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

// import usePinFeed from '../../hooks/usePinFeed';
// import usePinStats from '../../hooks/usePinStats';
import useOverviewFilters from './hooks/useOverviewFilters';

import BreakdownColumns from '../BreakdownColumns';
import BreakdownOverviewFilters from './BreakdownOverviewFilters';
import BreakdownOverviewList from './BreakdownOverviewList';
// import DashboardPinFeed from '../../../../../dashboard/presentational/DashboardPinFeed';
// import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
// import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
// import PieChart from 'components/shared/stats/presentational/PieChart';

// import { isEmpty } from 'helpers/generic';
// import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';
// import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
// import { timesheetSelectedCompanyIDs } from 'selectors/companyAdmin/timesheets';
import ApprovedHoursBreakdown from './ApprovedHoursBreakdown';
import { COMPANY_USER_ROLE_TYPES } from 'constants/companyAdmin/enums';
import { selectCompanyUsers } from 'selectors/companyAdmin/companyUsers';
import { selectWorkingHours } from 'selectors/companyAdmin/workingHours';

// todo clean up commmented out code
const DayBreakdownOverview = ({
    selectedDate,
    startDate,
    timesheets,
    // handlePDFReportGeneration,
    // disableReportGenPin,
    dailyHoursBreakdown,
}) => {
    // const userIDs = useSelector(timesheetSelectedCompanyIDs);
    const companyUsers = useSelector(selectCompanyUsers);
    const workingHours = Object.values(useSelector(selectWorkingHours));

    const {
        formState: { sortByType, filterByType, sortDirection },
        handleChange,
    } = useOverviewFilters();

    const shiftsForToday = useMemo(() => {
        try {
            const filteredTimesheets = timesheets.filter(timesheet => {
                const thisUser = companyUsers[timesheet.companyUserID];
                switch (filterByType) {
                    case 'allUsers':
                        break;
                    case 'owner':
                        if (!thisUser) return false;
                        return thisUser.type === COMPANY_USER_ROLE_TYPES.OWNER;
                    case 'admin':
                        if (!thisUser) return false;
                        return thisUser.type === COMPANY_USER_ROLE_TYPES.ADMIN;
                    case 'withSetHours':
                        if (!thisUser) return false;
                        return workingHours.some(hour => hour.companyUserID === thisUser?.ID);
                    case 'withoutSetHours':
                        if (!thisUser) return false;
                        return !workingHours.some(hour => hour.companyUserID === thisUser?.ID);
                    case 'withSetWages':
                        return !!thisUser?.companyPayRateID;
                    case 'withoutSetWages':
                        if (!thisUser) return false;
                        return !thisUser.companyPayRateID;
                    default:
                        break;
                }

                return true;
            });
            const sortedTimesheets = filteredTimesheets
                .reduce((acc, curr) => {
                    const thisDay = curr.days.find(day =>
                        moment(day.date).isSame(selectedDate, 'day'),
                    );
                    const todaysShifts = thisDay?.shifts?.map(shift => {
                        const notes = thisDay.clockerNotes.filter(note =>
                            moment(note.createdOn).isSame(selectedDate, 'day'),
                        );

                        return { ...shift, notes };
                    });
                    return [...acc, ...todaysShifts];
                }, [])
                .sort((a, b) => {
                    const userA = companyUsers[a.companyUserID];
                    const userB = companyUsers[b.companyUserID];
                    switch (sortByType) {
                        case 'name':
                            return `${userA?.firstName} ${userA?.lastName}`.localeCompare(
                                `${userB?.firstName} ${userB?.lastName}`,
                            );
                        case 'time':
                            return moment(a.lastClockedOutTime).diff(
                                moment(b.lastClockedOutTime),
                                'milliseconds',
                            );
                        case 'hours':
                            return a.formattedClockedInHours - b.formattedClockedInHours;
                        default:
                            return 0;
                    }
                });
            if (!sortDirection) return sortedTimesheets.reverse();
            return sortedTimesheets;
        } catch (e) {
            console.error(e);
            return [];
        }
    }, [selectedDate, timesheets, filterByType, sortByType, sortDirection]);

    // const {
    //     isFetching: statsIsFetching,
    //     fetchError: statsFetchError,
    //     stats,
    // } = usePinStats(
    //     userIDs,
    //     moment(selectedDate).format('YYYY-MM-DDTHH:mm:ss'),
    //     moment(selectedDate).format('YYYY-MM-DDTHH:mm:ss'),
    // );

    // const {
    //     isFetching: feedIsFetching,
    //     fetchError: feedFetchError,
    //     feed,
    // } = usePinFeed(userIDs, moment(selectedDate).format('YYYY-MM-DDTHH:mm:ss'), false);

    return (
        <BreakdownColumns
            className="day-breakdown-overview"
            left={
                <>
                    {timesheets.length > 1 && (
                        <BreakdownOverviewFilters
                            sortByType={sortByType}
                            sortDirection={sortDirection}
                            filterByType={filterByType}
                            handleChange={handleChange}
                        />
                    )}
                    <BreakdownOverviewList shiftsForToday={shiftsForToday} startDate={startDate} />
                </>
            }
            right={
                <>
                    {/* <div className="breakdown-piechart">
                        <BlockContainer
                            isFetching={statsIsFetching}
                            error={statsFetchError}
                            isEmpty={isEmpty(stats) || statsIsFetching}
                        >
                            <BlockHeading title="" style={{ marginBottom: 48 }}>
                                <button
                                    className={`button ${disableReportGenPin ? 'disabled' : ''}`}
                                    onClick={handlePDFReportGeneration}
                                    disabled={disableReportGenPin}
                                >
                                    <i className="fas fa-file-pdf" />
                                    Generate Report
                                </button>
                            </BlockHeading>
                            <PieChart
                                stats={stats}
                                noDataMessageOverride={
                                    <>
                                        No pins were placed on{' '}
                                        {
                                            <DateTimeContainer
                                                date={new Date(selectedDate)}
                                                datetime={DATE_TIME_IDS.DATE}
                                            />
                                        }
                                    </>
                                }
                            />
                        </BlockContainer>
                    </div>
                    <div className="breakdown-feed">
                        <DashboardPinFeed
                            pins={feed.reduce((acc, userFeed) => [...acc, ...userFeed.items], [])}
                            isFetching={feedIsFetching}
                            error={feedFetchError}
                        />
                    </div> */}
                    <ApprovedHoursBreakdown
                        dailyHoursBreakdown={dailyHoursBreakdown}
                        selectedDate={selectedDate}
                    />
                </>
            }
        />
    );
};

export default DayBreakdownOverview;

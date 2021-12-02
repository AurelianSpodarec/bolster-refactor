import DashboardPinFeed from 'components/companyAdmin/dashboard/presentational/DashboardPinFeed';
import React, { useEffect, useState } from 'react';
import BreakdownColumns from '../BreakdownColumns';
import usePinFeed from '../../hooks/usePinFeed';
import UserTables from '../../userTables/UserTables';
import BreakdownSummary from '../BreakdownSummary';
import useWeekOverview from '../../hooks/useWeekOverview';
import { DATE_TIME_IDS, TIME_PERIOD } from 'constants/companyAdmin/enums';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PieChart from 'components/shared/stats/presentational/PieChart';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { isEmpty } from 'helpers/generic';
import usePinStats from '../../hooks/usePinStats';
import moment from 'moment';
import BreakdownNotes from '../BreakdownNotes';
import BreakdownOverviewFilters from '../../breakdown/dayBreakdown/BreakdownOverviewFilters';
import useOverviewFilters from '../../breakdown/dayBreakdown/hooks/useOverviewFilters';

const WeekBreakdownOverview = ({ selectedDate, timesheets, isFetching, fetchError }) => {
    const isSingleUser = timesheets.length === 1;

    const [userIDs, setUserIDs] = useState([]);
    useEffect(() => {
        setUserIDs(timesheets.map(({ companyUserID }) => companyUserID));
    }, [timesheets]);
    const { isFetching: statsIsFetching, fetchError: statsFetchError, stats } = usePinStats(
        userIDs,
        moment(selectedDate).format('YYYY-MM-DDTHH:mm:ss'),
        moment(selectedDate).endOf('week').format('YYYY-MM-DDTHH:mm:ss'),
    );

    const {
        formState: { filterType, filterDirection },
        handleChange,
        filterByHasClockedIn,
        setFilterByHasClockedIn,
    } = useOverviewFilters();

    const { isFetching: feedIsFetching, fetchError: feedFetchError, feed } = usePinFeed(
        userIDs,
        moment(selectedDate).format('YYYY-MM-DDTHH:mm:ss'),
        true,
    );

    if (!isSingleUser) {
        return (
            <>
                {' '}
                <div style={{ marginBottom: '1rem' }} />
                <BreakdownOverviewFilters
                    filterType={filterType}
                    filterDirection={filterDirection}
                    handleChange={handleChange}
                    filterByHasClockedIn={filterByHasClockedIn}
                    setFilterByHasClockedIn={setFilterByHasClockedIn}
                />
                <UserTables
                    selectedDate={selectedDate}
                    isFetching={isFetching}
                    fetchError={fetchError}
                    timesheets={timesheets}
                    filterType={filterType}
                    filterDirection={filterDirection}
                    filterByHasClockedIn={filterByHasClockedIn}
                />
            </>
        );
    }
    const {
        companyUserID,
        firstName,
        lastName,
        email,
        formattedHours,
        formattedBreakHours,
        jobReferences,
        totalPins,
        clockerNotes,
    } = useWeekOverview(timesheets[0]);

    return (
        <BreakdownColumns
            className="week-breakdown-overview"
            left={
                <>
                    <div className="day" key={companyUserID}>
                        <BreakdownSummary
                            name={`${firstName} ${lastName} (${email})`}
                            formattedHours={formattedHours}
                            formattedBreakHours={formattedBreakHours}
                            totalPins={totalPins}
                            jobReferences={jobReferences}
                            timePeriod={TIME_PERIOD.WEEK}
                        />
                        <BreakdownNotes notes={clockerNotes} />
                    </div>
                </>
            }
            right={
                <>
                    <div className="breakdown-piechart">
                        <BlockContainer
                            isFetching={statsIsFetching}
                            error={statsFetchError}
                            isEmpty={isEmpty(stats) || statsIsFetching}
                        >
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
                    </div>
                </>
            }
        />
    );
};

export default WeekBreakdownOverview;

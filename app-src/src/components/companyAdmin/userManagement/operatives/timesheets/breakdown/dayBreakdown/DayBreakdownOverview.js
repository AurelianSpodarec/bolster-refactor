import React, { useEffect, useState } from 'react';
import moment from 'moment';

import usePinFeed from '../../hooks/usePinFeed';
import usePinStats from '../../hooks/usePinStats';
import useOverviewFilters from './hooks/useOverviewFilters';

import BreakdownColumns from '../BreakdownColumns';
import BreakdownOverviewFilters from './BreakdownOverviewFilters';
import BreakdownOverviewList from './BreakdownOverviewList';
import DashboardPinFeed from '../../../../../dashboard/presentational/DashboardPinFeed';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PieChart from 'components/shared/stats/presentational/PieChart';

import { isEmpty } from 'helpers/generic';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';

const DayBreakdownOverview = ({ selectedDate, timesheets }) => {
    const [userIDs, setUserIDs] = useState([]);
    const {
        formState: { filterType, filterDirection },
        handleChange,
        filterByHasClockedIn,
        setFilterByHasClockedIn,
    } = useOverviewFilters();

    useEffect(() => {
        setUserIDs(timesheets.map(({ companyUserID }) => companyUserID));
    }, [timesheets]);

    const { isFetching: statsIsFetching, fetchError: statsFetchError, stats } = usePinStats(
        userIDs,
        moment(selectedDate).format('YYYY-MM-DDTHH:mm:ss'),
        moment(selectedDate).format('YYYY-MM-DDTHH:mm:ss'),
    );

    const { isFetching: feedIsFetching, fetchError: feedFetchError, feed } = usePinFeed(
        userIDs,
        moment(selectedDate).format('YYYY-MM-DDTHH:mm:ss'),
        false,
    );

    return (
        <BreakdownColumns
            className="day-breakdown-overview"
            left={
                <>
                    {timesheets.length > 1 && (
                        <BreakdownOverviewFilters
                            filterType={filterType}
                            filterDirection={filterDirection}
                            handleChange={handleChange}
                            filterByHasClockedIn={filterByHasClockedIn}
                            setFilterByHasClockedIn={setFilterByHasClockedIn}
                        />
                    )}
                    <BreakdownOverviewList
                        timesheets={timesheets}
                        selectedDate={selectedDate}
                        filterType={filterType}
                        filterDirection={filterDirection}
                        filterByHasClockedIn={filterByHasClockedIn}
                    />
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

export default DayBreakdownOverview;

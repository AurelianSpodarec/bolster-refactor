import React, { useEffect, useState } from 'react';
import BreakdownColumns from '../BreakdownColumns';
import DashboardPinFeed from '../../../../../dashboard/presentational/DashboardPinFeed';
import usePinFeed from '../../hooks/usePinFeed';
import usePinStats from '../../hooks/usePinStats';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { isEmpty } from 'helpers/generic';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import PieChart from 'components/shared/stats/presentational/PieChart';
import moment from 'moment';
import useOverviewFilters from './hooks/useOverviewFilters';
import BreakdownOverviewFilters from './BreakdownOverviewFilters';
import BreakdownOverviewList from './BreakdownOverviewList';

const DayBreakdownOverview = ({ selectedDate, timesheets }) => {
    const [userIDs, setUserIDs] = useState([]);
    const {
        formState: { filterType, filterDirection },
        handleChange,
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
                        />
                    )}
                    <BreakdownOverviewList
                        timesheets={timesheets}
                        selectedDate={selectedDate}
                        filterType={filterType}
                        filterDirection={filterDirection}
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

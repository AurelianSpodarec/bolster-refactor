import DashboardPinFeed from 'components/companyAdmin/dashboard/presentational/DashboardPinFeed';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import PieChart from 'components/shared/stats/presentational/PieChart';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import BreakdownColumns from '../BreakdownColumns';
import BreakdownDaySummary from '../BreakdownDaySummary';
import { useParams } from 'react-router-dom';
import usePinStats from '../../hooks/usePinStats';
import usePinFeed from '../../hooks/usePinFeed';
import { isEmpty } from 'lodash';
import UserTables from '../../userTables/UserTables';

<<<<<<< Updated upstream:app-src/src/components/companyAdmin/userManagement/operatives/timesheets/breakdown/weekBreakdown/WeekBreakdownOverview.js
const WeekBreakdownOverview = ({ selectedDate, timesheets, isFetching, fetchError }) => {
    const isSingleUser = timesheets.length === 1;

    const [userIDs, setUserIDs] = useState([]);
    useEffect(() => {
        setUserIDs(timesheets.map(({ companyUserID }) => companyUserID));
    }, [timesheets]);
    // const { isFetching: statsIsFetching, fetchError: statsFetchError, stats } = usePinStats(
    //     id,
    //     selectedDate,
    //     moment(selectedDate).endOf('week').format(),
    // );
=======
const WeekBreakdownOverview = ({ selectedDate, timesheet }) => {
    const { id } = useParams();
    const { isFetching: statsIsFetching, fetchError: statsFetchError, stats } = usePinStats(
        id,
        selectedDate,
        moment(selectedDate).endOf('week').format(),
    );
>>>>>>> Stashed changes:app-src/src/components/companyAdmin/userManagement/operatives/operativeTimesheet/breakdown/weekBreakdown/WeekBreakdownOverview.js

    const { isFetching: feedIsFetching, fetchError: feedFetchError, feed } = usePinFeed(
        userIDs,
        selectedDate,
        true,
    );

    if (!isSingleUser) {
        return (
            <UserTables
                selectedDate={selectedDate}
                isFetching={isFetching}
                fetchError={fetchError}
                timesheets={timesheets}
            />
        );
    }

    return (
        <BreakdownColumns
            className="week-breakdown-overview"
            left={timesheets[0].clockerEntries.map(
                ({ firstName, lastName, totalPins, clockerEntries = [], date }, i) => {
                    return (
                        <div className="day" key={i}>
                            <BreakdownDaySummary
                                name={
                                    <>
                                        {firstName} {lastName} -{' '}
                                        <DateTimeContainer
                                            date={new Date(date)}
                                            datetime={DATE_TIME_IDS.DATE}
                                        />
                                    </>
                                }
                                pins={totalPins}
                                clockerEntries={clockerEntries}
                            />
                        </div>
                    );
                },
            )}
            right={
                <>
                    <div className="breakdown-piechart">
                        {/* <BlockContainer
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
                        </BlockContainer> */}
                    </div>
                    <div className="breakdown-feed">
                        <DashboardPinFeed
                            pins={feed?.items ?? []}
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

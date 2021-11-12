import PieChart from 'components/shared/stats/presentational/PieChart';
import React, { Fragment, useEffect, useState } from 'react';
import BreakdownColumns from '../BreakdownColumns';
import BreakdownDaySummary from '../BreakdownDaySummary';
import BreakdownNotes from '../BreakdownNotes';
import DashboardPinFeed from '../../../../../dashboard/presentational/DashboardPinFeed';
import { isEmpty } from 'helpers/generic';
import usePinStats from '../../hooks/usePinStats';
import moment from 'moment';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import usePinFeed from '../../hooks/usePinFeed';

const DayBreakdownOverview = ({ selectedDate, timesheets }) => {
    const isSingleUser = timesheets.length === 1;

    const [userIDs, setUserIDs] = useState([]);
    useEffect(() => {
        setUserIDs(timesheets.map(({ companyUserID }) => companyUserID));
    }, [timesheets]);

    // const { isFetching: statsIsFetching, fetchError: statsFetchError, stats } = usePinStats(
    //     id,
    //     selectedDate,
    //     moment(selectedDate).endOf('day').format(),
    // );

    const { isFetching: feedIsFetching, fetchError: feedFetchError, feed } = usePinFeed(
        userIDs,
        selectedDate,
        false,
    );

    return (
        <BreakdownColumns
            className="day-breakdown-overview"
            left={timesheets.map(
                ({ firstName, lastName, totalPins, clockerEntries, clockerNotes }, i) => {
                    return (
                        <Fragment key={i}>
                            <BreakdownDaySummary
                                name={`${firstName} ${lastName}`}
                                pins={totalPins}
                                clockerEntries={clockerEntries}
                            />
                            <BreakdownNotes notes={clockerNotes} />
                        </Fragment>
                    );
                },
            )}
            right={
                isSingleUser && (
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
                                pins={[].concat.apply([], feed?.items ?? [])}
                                isFetching={feedIsFetching}
                                error={feedFetchError}
                            />
                        </div>
                    </>
                )
            }
        />
    );
};

export default DayBreakdownOverview;

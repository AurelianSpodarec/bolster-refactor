import DashboardPinFeed from 'components/companyAdmin/dashboard/presentational/DashboardPinFeed';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import PieChart from 'components/shared/stats/presentational/PieChart';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import moment from 'moment';
import React from 'react';
import BreakdownColumns from '../BreakdownColumns';
import BreakdownDaySummary from '../BreakdownDaySummary';
import { useParams } from 'react-router-dom';
import usePinStats from '../../hooks/usePinStats';
import usePinFeed from '../../hooks/usePinFeed';
import { isEmpty } from 'lodash';
import useReferences from '../../hooks/useReferences';

const WeekBreakdownOverview = ({
    selectedDate,

    timesheet,
}) => {
    const { id } = useParams();
    const { isFetching: statsIsFetching, fetchError: statsFetchError, stats } = usePinStats(
        id,
        selectedDate,
        moment(selectedDate).endOf('week').format(),
    );

    const { isFetching: feedIsFetching, fetchError: feedFetchError, feed } = usePinFeed(
        id,
        selectedDate,
        true,
    );

    return (
        <BreakdownColumns
            className="week-breakdown-overview"
            left={timesheet.clockerEntries.map(
                ({ totalPins, totalHours, clockerEntries = [], date }, i) => {
                    const references = useReferences(clockerEntries);
                    return (
                        <div className="day" key={i}>
                            <BlockHeading
                                title={
                                    <>
                                        Day Overview -{' '}
                                        <DateTimeContainer
                                            date={new Date(date)}
                                            datetime={DATE_TIME_IDS.DATE}
                                        />
                                    </>
                                }
                            />
                            <BreakdownDaySummary
                                hours={totalHours}
                                pins={totalPins}
                                references={references}
                            />
                        </div>
                    );
                },
            )}
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
                            pins={feed ?? []}
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

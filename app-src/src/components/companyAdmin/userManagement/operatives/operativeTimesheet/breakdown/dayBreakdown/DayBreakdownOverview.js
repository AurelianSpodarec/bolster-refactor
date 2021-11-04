import PieChart from 'components/shared/stats/presentational/PieChart';
import React from 'react';
import useDay from '../../hooks/useDay';
import BreakdownColumns from '../BreakdownColumns';
import BreakdownDaySummary from '../BreakdownDaySummary';
import BreakdownNotes from '../BreakdownNotes';
import DashboardPinFeed from '../../../../../dashboard/presentational/DashboardPinFeed';
import { isEmpty } from 'helpers/generic';
import usePinStats from '../../hooks/usePinStats';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import usePinFeed from '../../hooks/usePinFeed';
import useReferences from '../../hooks/useReferences';

const DayBreakdownOverview = ({ selectedDate, timesheet }) => {
    const { id } = useParams();
    const { isFetching: statsIsFetching, fetchError: statsFetchError, stats } = usePinStats(
        id,
        selectedDate,
        moment(selectedDate).endOf('day').format(),
    );

    const { isFetching: feedIsFetching, fetchError: feedFetchError, feed } = usePinFeed(
        id,
        selectedDate,
        false,
    );

    const { totalPins, formattedHours, clockerEntries = [], clockerNotes } = useDay(
        timesheet,
        selectedDate,
    );

    const references = useReferences(clockerEntries);

    return (
        <BreakdownColumns
            className="day-breakdown-overview"
            left={
                <>
                    <BreakdownDaySummary
                        formattedHours={formattedHours}
                        pins={totalPins}
                        references={references}
                        clockerEntries={clockerEntries}
                    />
                    <BreakdownNotes notes={clockerNotes} />
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

export default DayBreakdownOverview;

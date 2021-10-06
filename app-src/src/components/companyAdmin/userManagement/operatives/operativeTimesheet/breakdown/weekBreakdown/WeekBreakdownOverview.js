import DashboardPinFeed from 'components/companyAdmin/dashboard/presentational/DashboardPinFeed';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import PieChart from 'components/shared/stats/presentational/PieChart';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import { isEmpty } from 'helpers/generic';
import React from 'react';
import useWeek from '../../hooks/useWeek';
import BreakdownColumns from '../BreakdownColumns';
import BreakdownDaySummary from '../BreakdownDaySummary';

const WeekBreakdownOverview = ({
    selectedDate,

    isFetching,
    fetchError,
    timesheet,
}) => {
    if (isFetching) return <LoadingIcon />;
    if (fetchError) return <p>{fetchError}</p>;
    if (isEmpty(timesheet)) return <p>Something went wrong</p>;

    return (
        <BreakdownColumns
            className="week-breakdown-overview"
            left={timesheet.clockerEntries.map(
                ({ totalPins, totalHours, clockerEntries, date }, i) => (
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
                            reference={'reference'}
                            description={'description'}
                        />
                    </div>
                ),
            )}
            right={
                <>
                    <div className="breakdown-piechart">
                        <PieChart stats={stats} />
                    </div>
                    <div className="breakdown-feed">
                        <DashboardPinFeed pins={feed} isFetching={false} error={null} />
                    </div>
                </>
            }
        />
    );
};

export default WeekBreakdownOverview;

const stats = {
    statuses: {
        ActionRequired: 32,
        Installed: 25,
        Inspected: 18,
        NoAction: 1,
        Other: 2,
    },
};

const feed = [
    {
        id: 4439686,
        status: 10,
        pinCode: '0007:52',
        createdBy: 'Tom G',
        location: 'testing / 475 / floor 1 / drawing 1',
        createdOn: '2021-10-06T14:31:57.899',
        syncedOn: '2021-10-06T14:32:02.238',
        pinID: 3234137,
    },
    {
        id: 4439623,
        status: 10,
        pinCode: '0012:57',
        createdBy: 'Mark Baker',
        location: 'Elite Site / Elite building 1 / Elite floor 1 / Elite Drawing 3',
        createdOn: '2021-10-05T10:30:46.156',
        syncedOn: '2021-10-05T10:43:57.815',
        pinID: 3234087,
    },
    {
        id: 4439622,
        status: 10,
        pinCode: '0001:06',
        createdBy: 'Mark Baker',
        location: 'Elite Site / Elite building 1 / Elite floor 1 / Elite Drawing 3',
        createdOn: '2021-10-05T09:45:39.281',
        syncedOn: '2021-10-05T09:45:53.003',
        pinID: 3233857,
    },
    {
        id: 4439621,
        status: 20,
        pinCode: '0008:06',
        createdBy: 'Mark Baker',
        location: 'Elite Site / Elite building 1 / Elite floor 1 / Elite drawing 4',
        createdOn: '2021-10-04T16:24:16.27',
        syncedOn: '2021-10-04T16:24:53.011',
        pinID: 3234086,
    },
    {
        id: 4439618,
        status: 20,
        pinCode: '0008:07',
        createdBy: 'Mark Baker',
        location: 'Elite Site / Elite building 1 / Elite floor 1 / Elite drawing 5',
        createdOn: '2021-09-30T09:02:37.158',
        syncedOn: '2021-09-30T09:02:58.52',
        pinID: 3234065,
    },
    {
        id: 4439617,
        status: 20,
        pinCode: '0007:07',
        createdBy: 'Mark Baker',
        location: 'Elite Site / Elite building 1 / Elite floor 1 / Elite drawing 5',
        createdOn: '2021-09-30T09:00:47.694',
        syncedOn: '2021-09-30T09:00:52.542',
        pinID: 3234064,
    },
];

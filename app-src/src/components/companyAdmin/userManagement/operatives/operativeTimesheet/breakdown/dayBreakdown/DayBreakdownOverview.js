import PieChart from 'components/shared/stats/presentational/PieChart';
import React from 'react';
import useDay from '../../hooks/useDay';
import BreakdownColumns from '../BreakdownColumns';
import BreakdownDaySummary from '../BreakdownDaySummary';
import BreakdownNotes from '../BreakdownNotes';
import DashboardPinFeed from '../../../../../dashboard/presentational/DashboardPinFeed';

const DayBreakdownOverview = ({ selectedDate }) => {
    const { hours, pins, reference, description, notes } = useDay(selectedDate) ?? {};

    return (
        <BreakdownColumns
            className="day-breakdown-overview"
            left={
                <>
                    <BreakdownDaySummary
                        hours={hours}
                        pins={pins}
                        reference={reference}
                        description={description}
                    />
                    <BreakdownNotes notes={notes} />
                </>
            }
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

export default DayBreakdownOverview;

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

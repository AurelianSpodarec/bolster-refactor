import React from 'react';

import moment from 'moment';
import WeekTable from '../presentational/WeekTable';

const data = [
    { hours: 9, pins: 98, timestamp: '2021-09-20' },
    { hours: 9, pins: 98, timestamp: '2021-09-21' },
    { hours: 9, pins: 98, timestamp: '2021-09-22' },
    { hours: 9, pins: 98, timestamp: '2021-09-23' },
    { hours: 9, pins: 98, timestamp: '2021-09-24' },
    { hours: 9, pins: 98, timestamp: '2021-09-25' },
    { hours: 9, pins: 98, timestamp: '2021-09-26' },

    { hours: 9, pins: 98, timestamp: '2021-09-27' },
    { hours: 6, pins: 87, timestamp: '2021-09-28' },
    { hours: 9, pins: 76, timestamp: '2021-09-29' },
    { hours: 12, pins: 56, timestamp: '2021-09-30' },
    { hours: 15, pins: 34, timestamp: '2021-09-01' },
    { hours: 10, pins: 34, timestamp: '2021-10-02' },
    { hours: 4, pins: 101, timestamp: '2021-10-03' },

    { hours: 9, pins: 98, timestamp: '2021-10-04' },
    { hours: 6, pins: 87, timestamp: '2021-10-05' },
    { hours: 9, pins: 76, timestamp: '2021-10-06' },
    { hours: 12, pins: 56, timestamp: '2021-10-07' },
    { hours: 15, pins: 34, timestamp: '2021-10-08' },
    { hours: 10, pins: 34, timestamp: '2021-10-09' },
    { hours: 4, pins: 101, timestamp: '2021-10-10' },
];

const getWeek = startDate => {
    const start = moment(startDate);

    const week = Array(7)
        .fill(null)
        .map((_day, i) => {
            const date = moment(start).add(i, 'days');
            const entry = data.find(({ timestamp }) => date.isSame(timestamp));
            if (entry) return entry;
            return { hours: 0, pins: 0, timestamp: date.format('YYYY-MM-DD') };
        });

    return week;
};

const WeekTableContainer = ({ startDate, selectedDate, timePeriod, onDaySelect, onWeekSelect }) => {
    const week = getWeek(startDate);
    return (
        <WeekTable
            week={week}
            selectedDate={selectedDate}
            timePeriod={timePeriod}
            onDaySelect={onDaySelect}
            onWeekSelect={onWeekSelect}
        />
    );
};

export default WeekTableContainer;

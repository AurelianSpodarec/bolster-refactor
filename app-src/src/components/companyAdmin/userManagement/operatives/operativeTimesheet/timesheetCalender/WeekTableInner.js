import React from 'react';
import moment from 'moment';
import Tab from './Tab';

import { TIME_PERIOD } from 'constants/companyAdmin/enums';

const WeekTableInner = ({
    startDate,
    selectedDate,
    timePeriod,
    onDaySelect,
    onWeekSelect,

    timesheet,
}) => {
    const { totalPins, totalHours, clockerEntries } = timesheet;

    console.log({ totalPins, totalHours, clockerEntries });

    return (
        <>
            {clockerEntries.map(({ date, totalPins, totalHours }, i) => (
                <td key={i} onClick={() => onDaySelect(date)}>
                    <div className="date">
                        <p>{moment(date).format('DD')}</p>
                        <p className="full">{moment(date).format('dddd DD')}</p>
                        <i class="fal fa-circle" />
                    </div>
                    <div className="tabs">
                        <Tab icon={<i class="fal fa-stopwatch" />}>{totalHours} Hours</Tab>
                        <Tab icon={<i class="fal fa-map-pin" style={{ padding: '0 3px' }} />}>
                            {totalPins} Pins
                        </Tab>
                    </div>
                    {moment(selectedDate).isSame(date, 'day') && timePeriod === TIME_PERIOD.DAY && (
                        <div className="film" />
                    )}
                </td>
            ))}
            <td key={-1} onClick={() => onWeekSelect(clockerEntries[0].date)}>
                <div className="date">
                    <p>
                        {moment(clockerEntries[0].date).format('DD')} -{' '}
                        {moment(clockerEntries[6].date).format('DD')}
                    </p>
                    <p className="full">
                        {moment(clockerEntries[0].date).format('dddd D')} -{' '}
                        {moment(clockerEntries[6].date).format('dddd D')}
                    </p>
                    <i class="fal fa-circle" />
                </div>
                <div className="tabs">
                    <Tab icon={<i class="fal fa-stopwatch" />}>{totalHours} Hours</Tab>
                    <Tab icon={<i class="fal fa-map-pin" style={{ padding: '0 3px' }} />}>
                        {totalPins} Pins
                    </Tab>
                </div>
                {timePeriod === TIME_PERIOD.WEEK && <div className="film" />}
            </td>
        </>
    );
};

export default WeekTableInner;

import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import { days } from 'constants/companyAdmin/timesheets';
import moment from 'moment';
import Tab from './Tab';

import { TIME_PERIOD } from 'constants/companyAdmin/enums';
import useWeek from '../hooks/useWeek';

const WeekTable = ({ startDate, selectedDate, timePeriod, onDaySelect, onWeekSelect }) => {
    const week = useWeek(startDate);

    return (
        <Table headers={[...days, 'Weekly']}>
            <tr>
                {week.map(({ hours, pins, timestamp }, i) => (
                    <td key={i} onClick={() => onDaySelect(timestamp)}>
                        <div className="date">
                            <p>{moment(timestamp).format('DD')}</p>
                            <p className="full">{moment(timestamp).format('dddd DD')}</p>
                            <i class="fal fa-circle" />
                        </div>
                        <div className="tabs">
                            <Tab icon={<i class="fal fa-stopwatch" />}>{hours} Hours</Tab>
                            <Tab icon={<i class="fal fa-map-pin" style={{ padding: '0 3px' }} />}>
                                {pins} Pins
                            </Tab>
                        </div>
                        {moment(selectedDate).isSame(timestamp, 'day') &&
                            timePeriod === TIME_PERIOD.DAY && <div className="film" />}
                    </td>
                ))}
                <td key={-1} onClick={() => onWeekSelect(week[0].timestamp)}>
                    <div className="date">
                        <p>
                            {moment(week[0].timestamp).format('DD')} -{' '}
                            {moment(week[6].timestamp).format('DD')}
                        </p>
                        <p className="full">
                            {moment(week[0].timestamp).format('dddd D')} -{' '}
                            {moment(week[6].timestamp).format('dddd D')}
                        </p>
                        <i class="fal fa-circle" />
                    </div>
                    <div className="tabs">
                        <Tab icon={<i class="fal fa-stopwatch" />}>
                            {week.reduce((acc, { hours }) => acc + hours, 0)} Hours
                        </Tab>
                        <Tab icon={<i class="fal fa-map-pin" style={{ padding: '0 3px' }} />}>
                            {week.reduce((acc, { pins }) => acc + pins, 0)} Pins
                        </Tab>
                    </div>
                    {timePeriod === TIME_PERIOD.WEEK && <div className="film" />}
                </td>
            </tr>
        </Table>
    );
};

export default WeekTable;

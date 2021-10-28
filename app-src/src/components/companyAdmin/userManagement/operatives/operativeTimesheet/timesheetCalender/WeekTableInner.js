import React from 'react';
import moment from 'moment';

import useDay from '../hooks/useDay';
import { useSelector } from 'react-redux';
import useReferences from '../hooks/useReferences';
import useWeeklyReferences from '../hooks/useWeeklyReferences';

import Tab from './Tab';
import ExpandableTab from './ExpandableTab';

import { TIME_PERIOD } from 'constants/companyAdmin/enums';
import { selectCompanySettings } from 'selectors/companyAdmin/companySettings';
import timesheetPin from '_content/images/pins-examples/timesheet-pin.png';

const WeekTableInner = ({ selectedDate, timePeriod, onDaySelect, onWeekSelect, timesheet }) => {
    const { totalPins, totalHours, clockerEntries = [] } = timesheet;

    const { timeZone } = useSelector(selectCompanySettings);
    const weeklyReferences = useWeeklyReferences(clockerEntries);

    return (
        <>
            {clockerEntries.map(({ date, totalPins, totalHours }, i) => {
                const { clockerEntries: dayClockerEntries } = useDay(timesheet, date);
                const references = useReferences(dayClockerEntries);

                return (
                    <td key={i} onClick={() => onDaySelect(date)}>
                        <div className="date">
                            <p>{moment(date).tz(timeZone.id).format('DD')}</p>
                            <p className="full">{moment(date).format('dddd DD')}</p>
                            <i className="fal fa-circle" />
                        </div>
                        {totalHours !== 0 && (
                            <div className="tabs">
                                <Tab icon={<i className="fal fa-stopwatch" />}>
                                    {totalHours} Hours
                                </Tab>
                                <Tab icon={<img src={timesheetPin} />}>
                                    {totalPins} Pin Histories
                                </Tab>
                                <ExpandableTab
                                    icon={<i className="fal fa-sticky-note" />}
                                    items={references}
                                    itemType="Job References"
                                />
                            </div>
                        )}
                        {moment(selectedDate).isSame(date, 'day') &&
                            timePeriod === TIME_PERIOD.DAY && <div className="film" />}
                    </td>
                );
            })}
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
                    <i className="fal fa-circle" />
                </div>
                <div className="tabs">
                    <Tab icon={<i className="fal fa-stopwatch" />}>{totalHours} Hours</Tab>
                    <Tab icon={<img src={timesheetPin} />}>{totalPins} Pin Histories</Tab>
                    <ExpandableTab
                        icon={<i className="fal fa-sticky-note" />}
                        items={weeklyReferences}
                        itemType="Job References"
                    />
                </div>
                {timePeriod === TIME_PERIOD.WEEK && <div className="film" />}
            </td>
        </>
    );
};

export default WeekTableInner;

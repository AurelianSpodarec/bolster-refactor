import React from 'react';
import moment from 'moment';
import Tab from './Tab';

import { TIME_PERIOD } from 'constants/companyAdmin/enums';
import { selectCompanySettings } from 'selectors/companyAdmin/companySettings';
import { useSelector } from 'react-redux';
import useReferences from '../hooks/useReferences';
import useDay from '../hooks/useDay';
import ExpandableTab from './ExpandableTab';

const WeekTableInner = ({
    startDate,
    selectedDate,
    timePeriod,
    onDaySelect,
    onWeekSelect,

    timesheet,
}) => {
    const { totalPins, totalHours, clockerEntries = [] } = timesheet;

    const { timeZone } = useSelector(selectCompanySettings);

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
                        {(totalHours !== 0 || totalPins !== 0 || !references.length) && (
                            <div className="tabs">
                                <Tab icon={<i className="fal fa-stopwatch" />}>
                                    {totalHours} Hours
                                </Tab>
                                <Tab
                                    icon={
                                        <i
                                            className="fal fa-map-pin"
                                            style={{ padding: '0 3px' }}
                                        />
                                    }
                                >
                                    {totalPins} Pins
                                </Tab>
                                <ExpandableTab
                                    icon={<i className="fal fa-sticky-note" />}
                                    items={references}
                                    itemType="references"
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
                    <Tab icon={<i className="fal fa-map-pin" style={{ padding: '0 3px' }} />}>
                        {totalPins} Pins
                    </Tab>
                </div>
                {timePeriod === TIME_PERIOD.WEEK && <div className="film" />}
            </td>
        </>
    );
};

export default WeekTableInner;

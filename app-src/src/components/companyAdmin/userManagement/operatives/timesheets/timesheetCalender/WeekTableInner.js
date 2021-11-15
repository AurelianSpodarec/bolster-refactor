import React from 'react';
import moment from 'moment';

import { useSelector } from 'react-redux';

import Tab from './Tab';
import ExpandableTab from './ExpandableTab';

import { TIME_PERIOD } from 'constants/companyAdmin/enums';
import { selectCompanySettings } from 'selectors/companyAdmin/companySettings';
import timesheetPin from '_content/images/pins-examples/timesheet-pin.png';
import { formatAsHrsMinsSecs } from 'helpers/generic';
import useExpandableTab from '../hooks/useExpandableTab';

const WeekTableInner = ({
    selectedDate,
    timePeriod,
    onDaySelect,
    onWeekSelect,
    timesheets,
    totals,
}) => {
    const { timeZone } = useSelector(selectCompanySettings);
    const { expandedDate, handleJobsClick } = useExpandableTab();

    const { totalPins, formattedHours, jobReferences } = totals.reduce(
        (acc, { totalPins, formattedHours, jobReferences }) => {
            acc.totalPins += totalPins;
            acc.formattedHours += formattedHours;
            acc.jobReferences = [
                ...acc.jobReferences,
                ...jobReferences.filter(jobReference => jobReference),
            ];
            return acc;
        },
        { totalPins: 0, formattedHours: 0, jobReferences: [] },
    );

    return (
        <>
            {totals.map(({ date, totalPins, formattedHours, jobReferences: _jobReferences }, i) => {
                const jobReferences = _jobReferences.filter(jobReference => jobReference);
                return (
                    <td key={i} onClick={() => onDaySelect(date)}>
                        <div className="date">
                            <p>{moment(date).tz(timeZone.id).format('DD')}</p>
                            <p className="full">{moment(date).format('dddd DD')}</p>
                            <i className="fal fa-circle" />
                        </div>
                        {formattedHours !== 0 && (
                            <div className="tabs">
                                <Tab icon={<i className="fal fa-stopwatch" />}>
                                    {formatAsHrsMinsSecs(formattedHours)}
                                </Tab>
                                <Tab icon={<img src={timesheetPin} />}>
                                    {totalPins} Pin Histories
                                </Tab>
                                {timesheets.length > 0 && (
                                    <ExpandableTab
                                        date={date}
                                        icon={<i className="fal fa-sticky-note" />}
                                        items={jobReferences}
                                        itemType={
                                            jobReferences.length > 1 || jobReferences.length === 0
                                                ? 'Jobs'
                                                : 'Job'
                                        }
                                        isExpanded={expandedDate === date}
                                        onJobClick={handleJobsClick}
                                    />
                                )}
                            </div>
                        )}
                        {moment(selectedDate).isSame(date, 'day') &&
                            timePeriod === TIME_PERIOD.DAY && <div className="film" />}
                    </td>
                );
            })}
            <td key={-1} onClick={() => onWeekSelect(totals[0].date)}>
                <div className="date">
                    <p>
                        {moment(totals[0].date).format('DD')} -{' '}
                        {moment(totals[6].date).format('DD')}
                    </p>
                    <p className="full">
                        {moment(totals[0].date).format('dddd D')} -{' '}
                        {moment(totals[6].date).format('dddd D')}
                    </p>
                    <i className="fal fa-circle" />
                </div>
                <div className="tabs">
                    <Tab icon={<i className="fal fa-stopwatch" />}>
                        {formatAsHrsMinsSecs(formattedHours)}
                    </Tab>
                    <Tab icon={<img src={timesheetPin} />}>{totalPins} Pin Histories</Tab>
                    {timesheets.length > 0 && (
                        <ExpandableTab
                            date="week"
                            icon={<i className="fal fa-sticky-note" />}
                            items={jobReferences}
                            itemType={
                                jobReferences.length > 1 || jobReferences.length === 0
                                    ? 'Jobs'
                                    : 'Job'
                            }
                            isExpanded={expandedDate === 'week'}
                            onJobClick={handleJobsClick}
                        />
                    )}
                </div>
                {timePeriod === TIME_PERIOD.WEEK && <div className="film" />}
            </td>
        </>
    );
};

export default WeekTableInner;

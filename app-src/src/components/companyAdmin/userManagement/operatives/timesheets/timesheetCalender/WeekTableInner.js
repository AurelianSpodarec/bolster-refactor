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
import { selectJobReferences } from 'selectors/companyAdmin/jobReferences';

const WeekTableInner = ({
    selectedDate,
    timePeriod,
    onDaySelect,
    onWeekSelect,
    timesheets,
    totals,
}) => {
    const jobReferences = useSelector(selectJobReferences);
    const { timeZone } = useSelector(selectCompanySettings);
    const { expandedDate, handleJobsClick } = useExpandableTab();

    const { totalPins, formattedHours, jobReferenceIDs } = totals.reduce(
        (acc, { totalPins, formattedHours, jobReferenceIDs }) => {
            acc.totalPins += totalPins;
            acc.formattedHours += formattedHours;
            acc.jobReferenceIDs = [...acc.jobReferenceIDs, ...jobReferenceIDs];
            return acc;
        },
        { totalPins: 0, formattedHours: 0, jobReferenceIDs: [] },
    );

    const getJobReferenceNames = ids => {
        return ids.map(id => jobReferences[id].name);
    };

    const filteredJobReferenceIDs = jobReferenceIDs.filter(reference => reference);
    const filteredJobReferenceNames = getJobReferenceNames(filteredJobReferenceIDs);

    return (
        <>
            {totals.map(({ date, totalPins, formattedHours, jobReferenceIDs }, i) => {
                const totalsFilteredJobReferenceIDs = jobReferenceIDs.filter(Boolean);
                const totalsFilteredJobReferenceNames = getJobReferenceNames(
                    totalsFilteredJobReferenceIDs,
                );

                return (
                    <td key={i} onClick={() => onDaySelect(date)}>
                        <div className="date">
                            <p>{moment(date).tz(timeZone.id).format('DD')}</p>
                            <p className="full">{moment(date).format('dddd DD')}</p>
                            <i className="fal fa-circle" />
                        </div>

                        <div className="tabs">
                            {formattedHours > 0 && (
                                <Tab icon={<i className="fal fa-stopwatch" />}>
                                    {formatAsHrsMinsSecs(formattedHours)}
                                </Tab>
                            )}

                            {totalPins > 0 && (
                                <Tab icon={<img src={timesheetPin} />}>
                                    {totalPins} Pin Histories
                                </Tab>
                            )}

                            {formattedHours > 0 && (
                                <ExpandableTab
                                    date={date}
                                    icon={<i className="fal fa-sticky-note" />}
                                    items={totalsFilteredJobReferenceNames}
                                    itemType={
                                        totalsFilteredJobReferenceNames.length > 1 ||
                                        totalsFilteredJobReferenceNames.length === 0
                                            ? 'Jobs'
                                            : 'Job'
                                    }
                                    isExpanded={expandedDate === date}
                                    onJobClick={handleJobsClick}
                                />
                            )}
                        </div>

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
                            items={filteredJobReferenceNames}
                            itemType={
                                filteredJobReferenceNames.length > 1 ||
                                filteredJobReferenceNames.length === 0
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

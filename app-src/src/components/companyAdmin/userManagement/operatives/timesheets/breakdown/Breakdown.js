import React from 'react';

import { DATE_TIME_IDS, TIME_PERIOD } from 'constants/companyAdmin/enums';
import BreakdownLayout from './BreakdownLayout';
import WeekBreakdownOverview from './weekBreakdown/WeekBreakdownOverview';
import DayBreakdownOverview from './dayBreakdown/DayBreakdownOverview';
import DayBreakdownLocation from './dayBreakdown/DayBreakdownLocation';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { isEmpty } from 'helpers/generic';
import moment from 'moment';

const Breakdown = ({
    selectedDate,
    timePeriod,
    isFetching,
    fetchError,
    timesheets,
    handlePDFReportGeneration,
    disableReportGenPin,
    filterByHasClockedIn,
    setFilterByHasClockedIn,
}) => {
    switch (timePeriod) {
        case TIME_PERIOD.WEEK:
            return (
                <BreakdownLayout
                    title={
                        <>
                            Week Overview &nbsp;(
                            <DateTimeContainer
                                date={new Date(selectedDate)}
                                datetime={DATE_TIME_IDS.DATE}
                            />{' '}
                            -{' '}
                            <DateTimeContainer
                                date={moment(selectedDate).add(6, 'days').toDate()}
                                datetime={DATE_TIME_IDS.DATE}
                            />
                            )
                        </>
                    }
                    tabs={[
                        {
                            id: 0,
                            title: 'Overview',
                            component: (
                                <WeekBreakdownOverview
                                    selectedDate={selectedDate}
                                    timesheets={timesheets}
                                    isFetching={isFetching}
                                    fetchError={fetchError}
                                    filterByHasClockedIn={filterByHasClockedIn}
                                    setFilterByHasClockedIn={setFilterByHasClockedIn}
                                />
                            ),
                        },
                    ]}
                    isLoading={isFetching}
                    error={fetchError}
                    noData={isEmpty(timesheets)}
                    disableReportGenPin={disableReportGenPin}
                    handlePDFReportGeneration={handlePDFReportGeneration}
                />
            );
        case TIME_PERIOD.DAY:
            return (
                <BreakdownLayout
                    title={
                        <>
                            Day Overview &nbsp;(
                            <DateTimeContainer
                                date={new Date(selectedDate)}
                                datetime={DATE_TIME_IDS.DATE}
                            />
                            )
                        </>
                    }
                    tabs={[
                        {
                            id: 0,
                            title: 'Overview',
                            component: (
                                <DayBreakdownOverview
                                    selectedDate={selectedDate}
                                    timesheets={timesheets}
                                    handlePDFReportGeneration={handlePDFReportGeneration}
                                    disableReportGenPin={disableReportGenPin}
                                    filterByHasClockedIn={filterByHasClockedIn}
                                    setFilterByHasClockedIn={setFilterByHasClockedIn}
                                />
                            ),
                        },
                        timesheets.length === 1 && {
                            id: 1,
                            title: 'Location',
                            component: (
                                <DayBreakdownLocation
                                    selectedDate={selectedDate}
                                    timesheet={timesheets[0]}
                                />
                            ),
                            disabled: timesheets.length > 1,
                        },
                    ]}
                    isLoading={isFetching}
                    error={fetchError}
                    noData={isEmpty(timesheets)}
                />
            );
        default:
            return null;
    }
};

export default Breakdown;

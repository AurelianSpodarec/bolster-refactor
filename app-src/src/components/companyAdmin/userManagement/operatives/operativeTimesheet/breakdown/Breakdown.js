import React from 'react';

import { DATE_TIME_IDS, TIME_PERIOD } from 'constants/companyAdmin/enums';
import BreakdownLayout from './BreakdownLayout';
import WeekBreakdownOverview from './weekBreakdown/WeekBreakdownOverview';
import DayBreakdownOverview from './dayBreakdown/DayBreakdownOverview';
import DayBreakdownLocation from './dayBreakdown/DayBreakdownLocation';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

const Breakdown = ({ selectedDate, timePeriod, isFetching, fetchError, timesheet }) => {
    switch (timePeriod) {
        case TIME_PERIOD.WEEK:
            return (
                <BreakdownLayout
                    title={
                        <>
                            Week Overview -{' '}
                            <DateTimeContainer
                                date={new Date(selectedDate)}
                                datetime={DATE_TIME_IDS.DATE}
                            />
                        </>
                    }
                    tabs={[
                        {
                            title: 'Overview',
                            component: (
                                <WeekBreakdownOverview
                                    selectedDate={selectedDate}
                                    isFetching={isFetching}
                                    fetchError={fetchError}
                                    timesheet={timesheet}
                                />
                            ),
                        },
                    ]}
                />
            );
        case TIME_PERIOD.DAY:
            return (
                <BreakdownLayout
                    title={
                        <>
                            Day Overview -{' '}
                            <DateTimeContainer
                                date={new Date(selectedDate)}
                                datetime={DATE_TIME_IDS.DATE}
                            />
                        </>
                    }
                    tabs={[
                        {
                            title: 'Overview',
                            component: (
                                <DayBreakdownOverview
                                    selectedDate={selectedDate}
                                    isFetching={isFetching}
                                    fetchError={fetchError}
                                    timesheet={timesheet}
                                />
                            ),
                        },
                        {
                            title: 'Location',
                            component: (
                                <DayBreakdownLocation
                                    selectedDate={selectedDate}
                                    isFetching={isFetching}
                                    fetchError={fetchError}
                                    timesheet={timesheet}
                                />
                            ),
                        },
                    ]}
                />
            );
        default:
            break;
    }
};

export default Breakdown;

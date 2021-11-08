import React from 'react';

import { DATE_TIME_IDS, TIME_PERIOD } from 'constants/companyAdmin/enums';
import BreakdownLayout from './BreakdownLayout';
import WeekBreakdownOverview from './weekBreakdown/WeekBreakdownOverview';
import DayBreakdownOverview from './dayBreakdown/DayBreakdownOverview';
import DayBreakdownLocation from './dayBreakdown/DayBreakdownLocation';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { isEmpty } from 'helpers/generic';

const Breakdown = ({
    selectedDate,
    timePeriod,
    isFetching,
    fetchError,
    timesheet,
    handlePDFReportGeneration,
}) => {
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
                                    timesheet={timesheet}
                                />
                            ),
                        },
                    ]}
                    isLoading={isFetching}
                    error={fetchError}
                    noData={isEmpty(timesheet)}
                    handlePDFReportGeneration={handlePDFReportGeneration}
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
                                    timesheet={timesheet}
                                />
                            ),
                        },
                        {
                            title: 'Location',
                            component: (
                                <DayBreakdownLocation
                                    selectedDate={selectedDate}
                                    timesheet={timesheet}
                                />
                            ),
                        },
                    ]}
                    isLoading={isFetching}
                    error={fetchError}
                    noData={isEmpty(timesheet)}
                    handlePDFReportGeneration={handlePDFReportGeneration}
                />
            );
        default:
            return null;
    }
};

export default Breakdown;

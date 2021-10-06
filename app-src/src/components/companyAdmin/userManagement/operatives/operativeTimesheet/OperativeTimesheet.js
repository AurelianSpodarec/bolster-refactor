import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';
import Breakdown from './breakdown/Breakdown';
import useOperativeTimesheet from './hooks/useOperativeTimesheet';
import TimesheetCalender from './timesheetCalender/TimesheetCalender';

const OperativeTimesheet = ({ operativeName }) => {
    const {
        startDate,
        selectedDate,
        timePeriod,

        isFetching,
        fetchError,
        timesheet,

        onPrev,
        onNext,
        onToday,
        onDaySelect,
        onWeekSelect,
    } = useOperativeTimesheet();

    return (
        <>
            <PageHeading leftChildren={true} title={`Timesheet - ${operativeName}`}>
                <BackButtonContainer />
            </PageHeading>
            <TimesheetCalender
                startDate={startDate}
                selectedDate={selectedDate}
                timePeriod={timePeriod}
                isFetching={isFetching}
                fetchError={fetchError}
                timesheet={timesheet}
                onPrev={onPrev}
                onNext={onNext}
                onToday={onToday}
                onDaySelect={onDaySelect}
                onWeekSelect={onWeekSelect}
            />
            <Breakdown selectedDate={selectedDate} timePeriod={timePeriod} />
        </>
    );
};

export default OperativeTimesheet;

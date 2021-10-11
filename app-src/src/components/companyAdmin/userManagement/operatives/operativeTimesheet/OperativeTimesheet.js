import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';
import Breakdown from './breakdown/Breakdown';
import useOperativeTimesheet from './hooks/useOperativeTimesheet';
import TimesheetCalender from './timesheetCalender/TimesheetCalender';

const OperativeTimesheet = () => {
    const {
        startDate,
        selectedDate,
        timePeriod,

        isFetching,
        fetchError,
        timesheet,
        companyUser,

        onPrev,
        onNext,
        onToday,
        onDaySelect,
        onWeekSelect,
    } = useOperativeTimesheet();

    return (
        <>
            <PageHeading
                leftChildren={true}
                title={`Timesheet - ${
                    isFetching
                        ? 'Loading...'
                        : companyUser?.userFirstName + ' ' + companyUser?.userLastName
                }`}
            >
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
            <Breakdown
                selectedDate={selectedDate}
                timePeriod={timePeriod}
                isFetching={isFetching}
                fetchError={fetchError}
                timesheet={timesheet}
            />
        </>
    );
};

export default OperativeTimesheet;

import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';
import Breakdown from './breakdown/Breakdown';
import useTimesheets from './hooks/useTimesheets';
import TimesheetCalender from './timesheetCalender/TimesheetCalender';
import UserTables from './userTables/UserTables';

const Timesheets = () => {
    const {
        startDate,
        selectedDate,
        timePeriod,
        isFetching,
        fetchError,
        timesheet,
        companyUser,
        isAllUsers,
        onPrev,
        onNext,
        onToday,
        onDaySelect,
        onWeekSelect,
        handlePDFReportGeneration,
    } = useTimesheets();

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
            {!isAllUsers ? (
                <Breakdown
                    selectedDate={selectedDate}
                    timePeriod={timePeriod}
                    isFetching={isFetching}
                    fetchError={fetchError}
                    timesheet={timesheet}
                    handlePDFReportGeneration={handlePDFReportGeneration}
                />
            ) : (
                <UserTables
                    selectedDate={selectedDate}
                    timePeriod={timePeriod}
                    isFetching={isFetching}
                    fetchError={fetchError}
                    timesheet={timesheet}
                />
            )}
        </>
    );
};

export default Timesheets;

import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';
import Breakdown from './breakdown/Breakdown';
import useTimesheets from './hooks/useTimesheets';
import TimesheetCalender from './timesheetCalender/TimesheetCalender';

const Timesheets = () => {
    const {
        startDate,
        selectedDate,
        timePeriod,
        companyUserIDs,
        setCompanyUserIDs,
        companyUserOptions,

        isFetching,
        fetchError,
        timesheets,
        totals,
        companyUser,
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
                companyUserIDs={companyUserIDs}
                setCompanyUserIDs={setCompanyUserIDs}
                companyUserOptions={companyUserOptions}
                isFetching={isFetching}
                fetchError={fetchError}
                timesheets={timesheets}
                totals={totals}
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
                timesheets={timesheets}
                handlePDFReportGeneration={handlePDFReportGeneration}
            />
        </>
    );
};

export default Timesheets;

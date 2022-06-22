import React from 'react';
import Breakdown from '../breakdown/Breakdown';
import useTimesheetsOverview from './hooks/useTimesheetsOverview';
import TimesheetCalender from '../timesheetCalender/TimesheetCalender';

const GeneralOverview = ({ setTitleData }) => {
    const {
        startDate,
        selectedDate,
        timePeriod,
        companyUserIDs,
        setCompanyUserIDs,
        companyUserOptions,
        jobReferenceIDs,
        setJobReferenceIDs,
        jobReferenceOptions,
        disableReportGenPin,
        isFetching,
        fetchError,
        timesheets,
        totals,
        onPrev,
        onNext,
        onToday,
        onDaySelect,
        onWeekSelect,
        handlePDFReportGeneration,
    } = useTimesheetsOverview(setTitleData);

    return (
        <>
            <TimesheetCalender
                startDate={startDate}
                selectedDate={selectedDate}
                timePeriod={timePeriod}
                companyUserIDs={companyUserIDs}
                setCompanyUserIDs={setCompanyUserIDs}
                companyUserOptions={companyUserOptions}
                jobReferenceIDs={jobReferenceIDs}
                setJobReferenceIDs={setJobReferenceIDs}
                jobReferenceOptions={jobReferenceOptions}
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
                startDate={startDate}
                timePeriod={timePeriod}
                isFetching={isFetching}
                fetchError={fetchError}
                timesheets={timesheets}
                handlePDFReportGeneration={handlePDFReportGeneration}
                disableReportGenPin={disableReportGenPin}
            />
        </>
    );
};

export default GeneralOverview;

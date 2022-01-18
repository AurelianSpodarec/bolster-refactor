import React from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

import Controls from './Controls';
import WeekTable from './WeekTable';

const TimesheetCalender = ({
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
    onPrev,
    onNext,
    onToday,
    onDaySelect,
    onWeekSelect,
}) => {
    return (
        <BlockContainer contentClass="timesheet-content-area">
            <div className="timesheet-calender">
                <Controls
                    startDate={startDate}
                    onPrev={onPrev}
                    onNext={onNext}
                    onToday={onToday}
                    companyUserIDs={companyUserIDs}
                    setCompanyUserIDs={setCompanyUserIDs}
                    companyUserOptions={companyUserOptions}
                />
                <WeekTable
                    startDate={startDate}
                    selectedDate={selectedDate}
                    timePeriod={timePeriod}
                    onDaySelect={onDaySelect}
                    onWeekSelect={onWeekSelect}
                    isFetching={isFetching}
                    fetchError={fetchError}
                    timesheets={timesheets}
                    totals={totals}
                />
            </div>
        </BlockContainer>
    );
};

export default TimesheetCalender;

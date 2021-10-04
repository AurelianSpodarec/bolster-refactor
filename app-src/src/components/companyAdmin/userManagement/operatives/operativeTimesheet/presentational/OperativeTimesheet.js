import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';
import TimesheetCalenderContainer from '../timesheetCalender/containers/TimesheetCalenderContainer';
import BreakdownContainer from '../breakdownContainer/containers/BreakdownContainer';

const OperativeTimesheet = ({
    operativeName,
    startDate,
    selectedDate,
    timePeriod,
    onPrev,
    onNext,
    onToday,
    onDaySelect,
    onWeekSelect,
}) => {
    return (
        <>
            <PageHeading leftChildren={true} title={`Timesheet - ${operativeName}`}>
                <BackButtonContainer />
            </PageHeading>
            <BlockContainer>
                <TimesheetCalenderContainer
                    startDate={startDate}
                    selectedDate={selectedDate}
                    timePeriod={timePeriod}
                    onPrev={onPrev}
                    onNext={onNext}
                    onToday={onToday}
                    onDaySelect={onDaySelect}
                    onWeekSelect={onWeekSelect}
                />
            </BlockContainer>
            <BlockContainer>
                <BreakdownContainer selectedDate={selectedDate} timePeriod={timePeriod} />
            </BlockContainer>
        </>
    );
};

export default OperativeTimesheet;

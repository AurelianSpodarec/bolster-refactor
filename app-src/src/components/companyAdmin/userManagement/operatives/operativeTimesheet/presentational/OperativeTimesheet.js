import React from 'react';

import { TIME_PERIOD } from '../../../../../../constants/companyAdmin/enums';
import moment from 'moment';
import { useState } from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';
import TimesheetCalenderContainer from '../timesheetCalender/containers/TimesheetCalenderContainer';

const OperativeTimesheet = ({ operativeName }) => {
    const thisWeek = moment(new Date()).startOf('week').add(1, 'days').toISOString();
    const [startDate, setStartDate] = useState(thisWeek);

    const [selectedDate, setSelectedDate] = useState(moment(new Date()).toISOString());
    const [timePeriod, setTimePeriod] = useState(TIME_PERIOD.DAY);

    const onPrev = () => setStartDate(moment(startDate).subtract(7, 'days').toISOString());
    const onNext = () => setStartDate(moment(startDate).add(7, 'days').toISOString());
    const onToday = () => setStartDate(thisWeek);

    const onDaySelect = timestamp => {
        setTimePeriod(TIME_PERIOD.DAY);
        setSelectedDate(timestamp);
    };
    const onWeekSelect = () => setTimePeriod(TIME_PERIOD.WEEK);

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
            <BlockContainer></BlockContainer>
        </>
    );
};

export default OperativeTimesheet;

import React, { useState } from 'react';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import OperativeTimesheet from '../presentational/OperativeTimesheet';
import { TIME_PERIOD } from 'constants/companyAdmin/enums';
import moment from 'moment';

const OperativeTimesheetContainer = () => {
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
        <OperativeTimesheet
            operativeName="##User Name##"
            startDate={startDate}
            selectedDate={selectedDate}
            timePeriod={timePeriod}
            onPrev={onPrev}
            onNext={onNext}
            onToday={onToday}
            onDaySelect={onDaySelect}
            onWeekSelect={onWeekSelect}
        />
    );
};

export default withRouter(connect(null)(OperativeTimesheetContainer));

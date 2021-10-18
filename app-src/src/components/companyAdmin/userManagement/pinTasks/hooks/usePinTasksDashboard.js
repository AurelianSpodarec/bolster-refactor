import React from 'react';

import moment from 'moment';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCompanySettings } from 'selectors/companyAdmin/companySettings';
import { PIN_STATS_DASHBOARD_VIEW, TIME_PERIOD } from 'constants/companyAdmin/enums';
import { CREATE_PIN_TASK } from 'constants/shared/modalTypes';
import showModal from 'actions/shared/generic/modals/sync/showModal';

const usePinTasksDashboard = () => {
    const dispatch = useDispatch();
    const { timeZone } = useSelector(selectCompanySettings);

    const [view, setView] = useState(PIN_STATS_DASHBOARD_VIEW.CALENDER);

    const weekStart = moment(new Date()).tz(timeZone.id).startOf('isoWeek').format();
    const monthStart = moment(new Date()).tz(timeZone.id).startOf('month').format();

    const timePeriods = {
        [PIN_STATS_DASHBOARD_VIEW.CALENDER]: TIME_PERIOD.MONTH,
        [PIN_STATS_DASHBOARD_VIEW.LIST]: TIME_PERIOD.WEEK,
        [PIN_STATS_DASHBOARD_VIEW.SERIES]: TIME_PERIOD.WEEK,
    };

    const starts = {
        [TIME_PERIOD.WEEK]: weekStart,
        [TIME_PERIOD.MONTH]: monthStart,
    };

    const timePeriod = timePeriods[view];
    const timePeriodStart = starts[timePeriod];

    const [startDate, setStartDate] = useState(timePeriodStart);

    const onPrev = () => {
        const newStartDate = moment(startDate).subtract(1, timePeriod).format();
        setStartDate(newStartDate);
    };
    const onNext = () => {
        const newStartDate = moment(startDate).add(1, timePeriod).format();
        setStartDate(newStartDate);
    };
    const onToday = () => {
        setStartDate(timePeriodStart);
    };
    const onViewChange = newView => {
        const newTimePeriod = timePeriods[newView];
        const newStartDate = moment(startDate)
            .tz(timeZone.id)
            .startOf(newTimePeriod === TIME_PERIOD.WEEK ? 'isoWeek' : 'month')
            .format();
        setView(newView);
        setStartDate(newStartDate);
    };

    const startCreatePinTask = (initialDate = undefined) => {
        dispatch(showModal(CREATE_PIN_TASK, { initialDate }));
    };

    return {
        startDate,
        view,
        timePeriod,

        onViewChange,
        onPrev,
        onNext,
        onToday,
        startCreatePinTask,
    };
};

export default usePinTasksDashboard;

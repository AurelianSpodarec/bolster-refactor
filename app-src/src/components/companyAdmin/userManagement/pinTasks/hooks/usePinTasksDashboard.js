import React, { useEffect } from 'react';

import moment from 'moment';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCompanySettings } from 'selectors/companyAdmin/companySettings';
import { PIN_STATS_DASHBOARD_VIEW, TIME_PERIOD } from 'constants/companyAdmin/enums';
import { CREATE_PIN_TASK, EDIT_PIN_TASK, EDIT_PIN_TASK_SERIES } from 'constants/shared/modalTypes';
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
    const [endDate, setEndDate] = useState(
        moment(startDate).add(1, timePeriod).subtract(1, 'day').format(),
    );

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
        const newStartDate = moment(new Date())
            .tz(timeZone.id)
            .startOf(newTimePeriod === TIME_PERIOD.WEEK ? 'isoWeek' : 'month')
            .format();
        setView(newView);
        setStartDate(newStartDate);
    };

    const startCreatePinTask = (initialDate = undefined) => {
        dispatch(showModal(CREATE_PIN_TASK, { initialDate, startDate }));
    };

    const startEditPinTask = id => {
        dispatch(showModal(EDIT_PIN_TASK, { id }));
    };

    const startEditPinTaskSeries = id => {
        dispatch(showModal(EDIT_PIN_TASK_SERIES, { id }));
    };

    useEffect(() => {
        setEndDate(moment(startDate).add(1, timePeriod).subtract(1, 'day').format());
    }, [startDate]);

    return {
        startDate,
        endDate,
        view,
        timePeriod,
        onViewChange,
        onPrev,
        onNext,
        onToday,
        startCreatePinTask,
        startEditPinTask,
        startEditPinTaskSeries,
    };
};

export default usePinTasksDashboard;

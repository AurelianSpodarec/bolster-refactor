import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';
import fetchAllServices from 'actions/superAdmin/services/async/fetchAllServices';
import fetchAllSites from 'actions/companyAdmin/sites/async/fetchAllSites';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import LegendSegment from './views/calendar/LegendSegment';

import { PIN_TASK_RECURRING_NAMES, PIN_TASK_STATUS_NAMES } from 'constants/companyAdmin/enums';

const calculatePercentage = (obj, target) => {
    const titleEnum = {
        recurring: PIN_TASK_RECURRING_NAMES.RECURRING,
        non_recurring: PIN_TASK_RECURRING_NAMES.NON_RECURRING,
        complete: PIN_TASK_STATUS_NAMES.COMPLETE,
        complete_late: PIN_TASK_STATUS_NAMES.COMPLETE_LATE,
        due_soon: PIN_TASK_STATUS_NAMES.DUE_SOON,
        incomplete: PIN_TASK_STATUS_NAMES.INCOMPLETE,
    };

    const percentageObj = Object.keys(obj).reduce(
        (res, item) => ({ ...res, [item]: (obj[item] / target) * 100 }),
        {},
    );

    const off =
        100 -
        Object.keys(percentageObj).reduce((res, item) => {
            return res + Math.round(percentageObj[item]);
        }, 0);

    const sortedObj = Object.keys(percentageObj)
        .sort((a, b) => percentageObj[a] - percentageObj[b])
        .reduce(
            (res, item) => ({
                ...res,
                [item]: Math.round(percentageObj[item]),
            }),
            {},
        );

    const formattedObj = Object.keys(sortedObj).map((item, index) => {
        const percent =
            Math.round(sortedObj[item]) +
            (off > index) -
            (index >= Object.keys(percentageObj).length + off);
        return {
            name: item,
            title: titleEnum[item],
            percent: isNaN(percent) ? 0 : percent,
        };
    });

    return formattedObj;
};

const TasksLegend = ({ types, statuses, pinTasks }) => {
    const dispatch = useDispatch();

    const numberOfTasks = Object.values(pinTasks).length;

    useEffect(() => {
        dispatch(fetchCompanyUsers());
        dispatch(fetchAllServices());
        dispatch(fetchAllSites());
    }, [dispatch]);

    return (
        <BlockContainer contentClass="legend" containerClass="size-lg-12">
            <LegendSegment stats={calculatePercentage(types, numberOfTasks)} type="recurrence" />
            <LegendSegment stats={calculatePercentage(statuses, numberOfTasks)} type="status" />
        </BlockContainer>
    );
};

export default TasksLegend;

import React, { useEffect } from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { PIN_TASK_RECURRING_NAMES, PIN_TASK_STATUS_NAMES } from 'constants/companyAdmin/enums';
import LegendSegment from './views/calendar/LegendSegment';
import { useDispatch, useSelector } from 'react-redux';
import fetchCompanyOperatives from 'actions/companyAdmin/operatives/async/fetchCompanyOperatives';
import MultiSelect from 'components/shared/generic/form/presentational/MultiSelect';
import { useForm } from 'helpers/hooks';
import Form from 'components/shared/generic/form/containers/Form';
import { selectCompanyUsers } from 'selectors/companyAdmin/companyUsers';
import setUserFilters from 'actions/companyAdmin/userManagement/async/setUserFilters';

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

    const operatives = useSelector(selectCompanyUsers);
    const operativeOptions = Object.values(operatives).map(
        ({ id, userFirstName, userLastName, companyName }) => ({
            value: id,
            label: `${userFirstName} ${userLastName} (${companyName})`,
        }),
    );

    const numberOfTasks = Object.values(pinTasks).length;

    const [form, handleChange] = useForm({
        operatives: [],
    });

    useEffect(() => {
        dispatch(fetchCompanyOperatives());
        if (handleChange) {
            dispatch(setUserFilters(form.operatives));
        }
    }, [dispatch]);

    useEffect(() => {
        dispatch(setUserFilters(form.operatives));
    }, [dispatch, form.operatives]);

    return (
        <BlockContainer contentClass="legend" containerClass="size-lg-12">
            <LegendSegment stats={calculatePercentage(types, numberOfTasks)} type="recurrence" />
            <LegendSegment stats={calculatePercentage(statuses, numberOfTasks)} type="status" />
            <Form>
                <MultiSelect
                    name="operatives"
                    value={form.operatives}
                    onChange={handleChange}
                    options={operativeOptions}
                    placeholder="-- filter by operative --"
                />
            </Form>
        </BlockContainer>
    );
};

export default TasksLegend;

import fetchPinTasks from 'actions/companyAdmin/pinTasks/async/fetchPinTasks';
import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFilteredPinTasks from '../../../../hooks/useFilteredPinTasks';

import {
    selectPinTasks,
    selectPinTasksError,
    selectPinTasksIsFetching,
} from 'selectors/companyAdmin/pinTasks';

const useList = startDate => {
    const dispatch = useDispatch();

    const isFetching = useSelector(selectPinTasksIsFetching);
    const error = useSelector(selectPinTasksError);
    const tasks = useSelector(selectPinTasks);

    const pinTasks = useFilteredPinTasks(tasks);

    useEffect(() => {
        dispatch(fetchPinTasks(startDate, moment(startDate).add(1, 'week').format()));
    }, [dispatch, startDate]);

    const statuses = Object.values(pinTasks).reduce(
        (res, { dueOn, actionedOn }) => {
            if (actionedOn) {
                if (moment(actionedOn).isAfter(dueOn)) res.complete_late = res.complete_late + 1;
                else res.complete = res.complete + 1;
            } else {
                if (moment(dueOn).isBefore()) res.incomplete = res.incomplete + 1;
                else res.due_soon = res.due_soon + 1;
            }

            return res;
        },
        { complete: 0, complete_late: 0, due_soon: 0, incomplete: 0 },
    );

    const types = Object.values(pinTasks).reduce(
        (res, { isRecurring }) => {
            if (isRecurring) res.recurring = res.recurring + 1;
            else res.non_recurring = res.non_recurring + 1;

            return res;
        },
        { recurring: 0, non_recurring: 0 },
    );

    return { pinTasks: Object.values(pinTasks), isFetching, error, statuses, types };
};

export default useList;

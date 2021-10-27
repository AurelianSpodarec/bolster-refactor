import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectPinTasks,
    selectPinTasksIsFetching,
    selectPinTasksError,
} from 'selectors/companyAdmin/pinTasks';
import fetchPinTasks from 'actions/companyAdmin/pinTasks/async/fetchPinTasks';
import { isEmpty } from 'helpers/generic';
import { TOGGLE_RESTRICT_USER_PAYMENTS_FAILURE } from 'constants/actionTypes/usersManagement';
import { PIN_TASK_RECURRING_NAMES, PIN_TASK_STATUS_NAMES } from 'constants/companyAdmin/enums';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const useCalendar = startDate => {
    const dispatch = useDispatch();

    const pinTasks = useSelector(selectPinTasks);
    const isFetching = useSelector(selectPinTasksIsFetching);

    const error = useSelector(selectPinTasksError);

    const weekday = moment(startDate).isoWeekday() - 1;

    const matrix = [[], [], [], [], []];

    const currDate = moment(startDate).subtract(weekday, 'days');

    for (let i = 0; i < 7 * 5; i++) {
        const x = Math.floor(i / 7);
        const y = i % 7;

        const relevantPinTasks = [];

        Object.values(pinTasks).forEach(pinTask => {
            if (moment(currDate).isSame(pinTask.dueOn, 'day')) relevantPinTasks.push(pinTask);
        });

        matrix[x][y] = {
            date: currDate.format(),
            pinTasks: relevantPinTasks,
        };

        currDate.add(1, 'day');
    }

    const types = Object.values(pinTasks).reduce(
        (res, { isRecurring }) => {
            if (isRecurring) res.recurring = res.recurring + 1;
            else res.non_recurring = res.non_recurring + 1;

            return res;
        },
        { recurring: 0, non_recurring: 0 },
    );

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

    // const types = [
    //     {
    //         name: 'recurring',
    //         title: PIN_TASK_RECURRING_NAMES.RECURRING,
    //         percent: 99,
    //     },
    //     {
    //         name: 'non_recurring',
    //         title: PIN_TASK_RECURRING_NAMES.NON_RECURRING,
    //         percent: 1,
    //     },
    // ];

    // const statuses = [
    //     {
    //         name: 'complete',
    //         title: PIN_TASK_STATUS_NAMES.COMPLETE,
    //         percent: 25,
    //     },
    //     {
    //         name: 'complete_late',
    //         title: PIN_TASK_STATUS_NAMES.COMPLETE_LATE,
    //         percent: 25,
    //     },
    //     {
    //         name: 'due_soon',
    //         title: PIN_TASK_STATUS_NAMES.DUE_SOON,
    //         percent: 20,
    //     },
    //     {
    //         name: 'incomplete',
    //         title: PIN_TASK_STATUS_NAMES.INCOMPLETE,
    //         percent: 30,
    //     },
    // ];

    useEffect(() => {
        dispatch(fetchPinTasks(startDate, moment(startDate).add(1, 'month').format()));
    }, [dispatch, startDate]);

    const noData = isEmpty(pinTasks);

    return { days, matrix, noData, pinTasks, isFetching, error, types, statuses };
};

export default useCalendar;

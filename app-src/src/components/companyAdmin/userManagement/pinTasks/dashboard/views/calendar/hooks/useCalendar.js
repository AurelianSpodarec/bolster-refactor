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

    useEffect(() => {
        dispatch(fetchPinTasks(startDate, moment(startDate).add(1, 'month').format()));
    }, [dispatch, startDate]);

    const noData = isEmpty(pinTasks);

    return { days, matrix, noData, isFetching, error };
};

export default useCalendar;

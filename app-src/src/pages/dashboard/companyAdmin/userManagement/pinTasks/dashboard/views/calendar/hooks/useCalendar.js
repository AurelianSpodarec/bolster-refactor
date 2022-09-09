import moment from 'moment';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFilteredPinTasks from '../../../../hooks/useFilteredPinTasks';

import { selectPinTasks, selectPinTasksIsFetching } from 'selectors/companyAdmin/pinTasks';
import fetchPinTasks from 'actions/companyAdmin/pinTasks/async/fetchPinTasks';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const useCalendar = startDate => {
    const dispatch = useDispatch();

    const tasks = useSelector(selectPinTasks);
    const pinTasks = useFilteredPinTasks(tasks);

    const isFetching = useSelector(selectPinTasksIsFetching);

    const weekday = moment(startDate).isoWeekday() - 1;

    // set cur date to start of week (mon)
    const currDate = moment(startDate).subtract(weekday, 'days');

    // create array of weeks, each week is an array of days
    const numberOfWeeksToShow = 6;
    const daysInWeek = 7;
    const matrix = useMemo(() => {
        const weekMatrix = new Array(numberOfWeeksToShow).fill().map(() => new Array());

        for (let i = 0; i < daysInWeek * numberOfWeeksToShow; i++, currDate.add(1, 'day')) {
            const week = Math.floor(i / daysInWeek);
            const day = i % daysInWeek;

            const relevantPinTasks = Object.values(pinTasks).filter(({ dueOn }) => {
                return currDate.isSame(dueOn, 'day');
            });

            weekMatrix[week][day] = {
                date: currDate.format(),
                pinTasks: relevantPinTasks,
            };

            // currDate.add(1, 'day');
        }
        // only show weeks if they have day overlap with start date's month
        const weeksToShow = weekMatrix.filter(week => {
            return week.some(day => moment(day.date).isSame(startDate, 'month'));
        });
        return weeksToShow;
    }, [pinTasks, startDate]);

    const types = Object.values(pinTasks).reduce(
        (res, { isRecurring }) => {
            if (isRecurring) res.recurring++;
            else res.non_recurring++;

            return res;
        },
        { recurring: 0, non_recurring: 0 },
    );

    const statuses = Object.values(pinTasks).reduce(
        (res, { dueOn, actionedOn }) => {
            if (actionedOn) {
                if (moment(actionedOn).isAfter(dueOn)) res.complete_late++;
                else res.complete++;
            } else {
                if (moment(dueOn).isBefore()) res.incomplete++;
                else res.due_soon++;
            }
            return res;
        },
        { complete: 0, complete_late: 0, due_soon: 0, incomplete: 0 },
    );

    useEffect(() => {
        dispatch(fetchPinTasks(startDate, moment(startDate).endOf('month')));
    }, [dispatch, startDate]);

    return { days, matrix, pinTasks, isFetching, types, statuses };
};

export default useCalendar;

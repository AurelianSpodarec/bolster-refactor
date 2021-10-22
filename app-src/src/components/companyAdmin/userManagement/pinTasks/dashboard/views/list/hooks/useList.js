import fetchPinTasks from 'actions/companyAdmin/pinTasks/async/fetchPinTasks';
import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectPinTasks,
    selectPinTasksError,
    selectPinTasksIsFetching,
} from 'selectors/companyAdmin/pinTasks';

const useList = startDate => {
    const dispatch = useDispatch();

    const pinTasks = useSelector(selectPinTasks);
    const isFetching = useSelector(selectPinTasksIsFetching);

    const error = useSelector(selectPinTasksError);

    useEffect(() => {
        dispatch(fetchPinTasks(startDate, moment(startDate).add(1, 'week').format()));
    }, [dispatch, startDate]);

    return { pinTasks: Object.values(pinTasks), isFetching, error };
};

export default useList;

import fetchPinTaskSeriesMultiple from 'actions/companyAdmin/pinTasks/async/fetchPinTaskSeriesMultiple';
import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectPinTaskSeriesMultiple,
    selectPinTasksError,
    selectPinTasksIsFetching,
} from 'selectors/companyAdmin/pinTasks';

const useSeries = () => {
    const dispatch = useDispatch();

    const pinTaskSeriesMultiple = useSelector(selectPinTaskSeriesMultiple);
    const isFetching = useSelector(selectPinTasksIsFetching);

    const error = useSelector(selectPinTasksError);

    useEffect(() => {
        dispatch(fetchPinTaskSeriesMultiple());
    }, [dispatch]);

    return { pinTaskSeriesMultiple: Object.values(pinTaskSeriesMultiple), isFetching, error };
};

export default useSeries;

import fetchPinTaskSeriesMultiple from 'actions/companyAdmin/pinTasks/async/fetchPinTaskSeriesMultiple';
import useFilteredPinTasks from 'components/companyAdmin/userManagement/pinTasks/hooks/useFilteredPinTasks';
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

    const pinTasks = useFilteredPinTasks(pinTaskSeriesMultiple);

    const error = useSelector(selectPinTasksError);

    useEffect(() => {
        dispatch(fetchPinTaskSeriesMultiple());
    }, [dispatch]);

    return { pinTaskSeriesMultiple: pinTasks, isFetching, error };
};

export default useSeries;

import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import { FETCH_PIN_TASK } from 'constants/shared/modalTypes';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectPinTask,
    selectPinTasksIsFetching,
    selectPinTasksIsPosting,
    selectPinTasksError,
} from 'selectors/companyAdmin/pinTasks';

import fetchPinTask from 'actions/companyAdmin/pinTasks/async/fetchPinTask';

const useViewPinTask = id => {
    const dispatch = useDispatch();
    console.log(id);
    const pinTask = useSelector(state => selectPinTask(state, id));
    const pinTasksIsFetching = useSelector(selectPinTasksIsFetching);

    const pinTasksIsPosting = useSelector(selectPinTasksIsPosting);

    const pinTasksError = useSelector(selectPinTasksError);

    useEffect(() => {
        dispatch(fetchPinTask(id));
    }, [dispatch]);

    const closeModal = () => dispatch(hideModal(FETCH_PIN_TASK));

    return {
        closeModal,
        isFetching: pinTasksIsFetching,
        isPosting: pinTasksIsPosting,
        error: pinTasksError,
        pinTask,
    };
};

export default useViewPinTask;

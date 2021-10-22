import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import { EDIT_PIN_TASK } from 'constants/shared/modalTypes';
import { useForm, usePrevious } from 'helpers/hooks';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectPinTask,
    selectPinTasksIsFetching,
    selectPinTasksIsPosting,
    selectPinTasksPostSuccess,
    selectPinTasksError,
} from 'selectors/companyAdmin/pinTasks';
import editPinTask from 'actions/companyAdmin/pinTasks/async/editPinTask';
import fetchPinTask from 'actions/companyAdmin/pinTasks/async/fetchPinTask';

const useEditPinTask = id => {
    const dispatch = useDispatch();

    const pinTask = useSelector(state => selectPinTask(state, id));
    const pinTasksIsFetching = useSelector(selectPinTasksIsFetching);

    const pinTasksIsPosting = useSelector(selectPinTasksIsPosting);
    const pinTasksPostSuccess = useSelector(selectPinTasksPostSuccess);

    const pinTasksError = useSelector(selectPinTasksError);

    useEffect(() => {
        dispatch(fetchPinTask(id));
    }, [dispatch]);

    const [formData, handleChange] = useForm({ date: pinTask?.dueOn });

    const closeModal = () => dispatch(hideModal(EDIT_PIN_TASK));

    const onSubmit = () => {
        const { date } = formData;
        dispatch(editPinTask(id, date));
    };

    const prevPinTasksPostSuccess = usePrevious(pinTasksPostSuccess);
    useEffect(() => {
        if (!prevPinTasksPostSuccess && pinTasksPostSuccess) closeModal();
    }, [dispatch, pinTasksPostSuccess, prevPinTasksPostSuccess]);

    return {
        formData,
        handleChange,
        closeModal,
        isFetching: pinTasksIsFetching,
        isPosting: pinTasksIsPosting,
        error: pinTasksError,
        onSubmit,
        pinTask,
    };
};

export default useEditPinTask;

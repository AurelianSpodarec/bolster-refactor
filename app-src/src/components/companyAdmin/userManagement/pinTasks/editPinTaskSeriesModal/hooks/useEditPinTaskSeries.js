import editPinTaskSeries from 'actions/companyAdmin/pinTasks/async/editPinTaskSeries';
import fetchPinTaskSeries from 'actions/companyAdmin/pinTasks/async/fetchPinTaskSeries';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import { EDIT_PIN_TASK_SERIES } from 'constants/shared/modalTypes';
import { useForm, usePrevious } from 'helpers/hooks';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectPinTaskSeries,
    selectPinTasksError,
    selectPinTasksIsFetching,
    selectPinTasksIsPosting,
    selectPinTasksPostSuccess,
} from 'selectors/companyAdmin/pinTasks';

const useEditPinTaskSeries = id => {
    const dispatch = useDispatch();

    const pinTaskSeries = useSelector(state => selectPinTaskSeries(state, id));
    const pinTasksIsFetching = useSelector(selectPinTasksIsFetching);

    const pinTasksIsPosting = useSelector(selectPinTasksIsPosting);
    const pinTasksPostSuccess = useSelector(selectPinTasksPostSuccess);

    const pinTasksError = useSelector(selectPinTasksError);

    useEffect(() => {
        dispatch(fetchPinTaskSeries(id));
    }, [dispatch]);

    const [formData, handleChange] = useForm({
        pins: pinTaskSeries?.pinIDs,
        endDate: pinTaskSeries?.recurrenceEndsOn,
        service: null,
        template: null,
    });

    const closeModal = () => dispatch(hideModal(EDIT_PIN_TASK_SERIES));

    const onSubmit = () => {
        const { endDate, pins } = formData;
        dispatch(editPinTaskSeries(id, endDate, pins));
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
        pinTaskSeries,
    };
};

export default useEditPinTaskSeries;

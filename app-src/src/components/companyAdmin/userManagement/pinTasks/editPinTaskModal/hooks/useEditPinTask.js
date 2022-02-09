import { useForm, usePrevious } from 'helpers/hooks';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import fetchOperativesForDrawing from 'actions/companyAdmin/operatives/async/fetchOperativesForDrawing';
import editPinTask from 'actions/companyAdmin/pinTasks/async/editPinTask';
import fetchPinTask from 'actions/companyAdmin/pinTasks/async/fetchPinTask';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';

import {
    selectPinTask,
    selectPinTasksIsFetching,
    selectPinTasksIsPosting,
    selectPinTasksPostSuccess,
    selectPinTasksError,
} from 'selectors/companyAdmin/pinTasks';
import { getOperatives, getOperativesIsFetching } from 'selectors/companyAdmin/operatives';

import { isObjEmpty } from 'helpers/generic';
import { EDIT_PIN_TASK } from 'constants/shared/modalTypes';

const useEditPinTask = id => {
    const dispatch = useDispatch();

    const pinTask = useSelector(state => selectPinTask(state, id));
    const pinTasksIsFetching = useSelector(selectPinTasksIsFetching);

    const pinTasksIsPosting = useSelector(selectPinTasksIsPosting);
    const pinTasksPostSuccess = useSelector(selectPinTasksPostSuccess);
    const prevPinTasksPostSuccess = usePrevious(pinTasksPostSuccess);

    const pinTasksError = useSelector(selectPinTasksError);

    const operativesObj = useSelector(getOperatives);
    const operativesIsFetching = useSelector(getOperativesIsFetching);

    const [formData, handleChange] = useForm({
        dueDate: pinTask?.dueOn,
        companyUserID: pinTask?.companyUserID,
    });

    useEffect(() => {
        dispatch(fetchPinTask(id));
    }, [id]);

    useEffect(() => {
        if (!isObjEmpty(pinTask) && pinTask.drawingID) {
            dispatch(fetchOperativesForDrawing(pinTask.drawingID));
        }
    }, [pinTask]);

    useEffect(() => {
        if (!prevPinTasksPostSuccess && pinTasksPostSuccess) closeModal();
    }, [dispatch, pinTasksPostSuccess, prevPinTasksPostSuccess]);

    const operatives = useMemo(() => {
        if (!isObjEmpty(operativesObj)) {
            return Object.values(operativesObj).reduce(
                (acc, { companyUserID, userFirstName, userLastName }) => {
                    acc.push({ value: companyUserID, label: `${userFirstName} ${userLastName}` });

                    return acc;
                },
                [],
            );
        }

        return [];
    }, [operativesObj, pinTask]);

    const closeModal = () => dispatch(hideModal(EDIT_PIN_TASK));

    const onSubmit = () => {
        dispatch(editPinTask(id, formData));
    };

    return {
        formData,
        handleChange,
        closeModal,
        isFetching: pinTasksIsFetching || operativesIsFetching,
        isPosting: pinTasksIsPosting,
        error: pinTasksError,
        onSubmit,
        pinTask,
        operatives,
    };
};

export default useEditPinTask;

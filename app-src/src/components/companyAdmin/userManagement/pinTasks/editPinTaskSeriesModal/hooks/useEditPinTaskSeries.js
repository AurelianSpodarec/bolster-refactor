import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, usePrevious } from 'helpers/hooks';

import fetchOperativesForDrawing from 'actions/companyAdmin/operatives/async/fetchOperativesForDrawing';
import deletePinTaskSeries from 'actions/companyAdmin/pinTasks/async/deletePinTaskSeries';
import editPinTaskSeries from 'actions/companyAdmin/pinTasks/async/editPinTaskSeries';
import fetchPinTaskSeries from 'actions/companyAdmin/pinTasks/async/fetchPinTaskSeries';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';

import {
    selectPinTaskSeries,
    selectPinTasksError,
    selectPinTasksIsFetching,
    selectPinTasksIsPosting,
    selectPinTasksPostSuccess,
} from 'selectors/companyAdmin/pinTasks';
import { getOperatives, getOperativesIsFetching } from 'selectors/companyAdmin/operatives';

import { CONFIRM_DELETE, EDIT_PIN_TASK_SERIES } from 'constants/shared/modalTypes';
import { isObjEmpty } from 'helpers/generic';
import { DAYS_FLAGGED, DAYS_FLAGGED_LOOKUP, RECURRING_TYPE } from 'constants/companyAdmin/enums';

const useEditPinTaskSeries = id => {
    const dispatch = useDispatch();

    const pinTaskSeries = useSelector(state => selectPinTaskSeries(state, id));
    const pinTasksIsFetching = useSelector(selectPinTasksIsFetching);

    const pinTasksIsPosting = useSelector(selectPinTasksIsPosting);
    const pinTasksPostSuccess = useSelector(selectPinTasksPostSuccess);
    const prevPinTasksPostSuccess = usePrevious(pinTasksPostSuccess);

    const pinTasksError = useSelector(selectPinTasksError);

    const operativesObj = useSelector(getOperatives);
    const operativesIsFetching = useSelector(getOperativesIsFetching);

    const recurrenceDays = useMemo(() => {
        return pinTaskSeries?.recurrenceWeeklyDays.map(day => DAYS_FLAGGED_LOOKUP[day]);
    }, [pinTaskSeries]);

    const [formData, handleChange] = useForm({
        companyUserID: pinTaskSeries.companyUserID,
        pinIDs: pinTaskSeries?.pinIDs,
        startOn: pinTaskSeries?.recurrenceStartsOn,
        endOn: pinTaskSeries?.recurrenceEndsOn,
        recurrenceType: pinTaskSeries?.recurrenceType,
        recurrenceDays,
    });

    useEffect(() => {
        dispatch(fetchPinTaskSeries(id));
    }, [dispatch]);

    useEffect(() => {
        if (!isObjEmpty(pinTaskSeries) && pinTaskSeries.drawingID) {
            dispatch(fetchOperativesForDrawing(pinTaskSeries.drawingID));
        }
    }, [pinTaskSeries]);

    useEffect(() => {
        if (!isWeekly) {
            handleChange('days', []);
            dispatch(removeFieldError('days'));
        }
    }, [isWeekly]);

    useEffect(() => {
        if (!prevPinTasksPostSuccess && pinTasksPostSuccess) {
            closeModal();
            dispatch(fetchPinTaskSeries(id));
        }
    }, [pinTasksPostSuccess, prevPinTasksPostSuccess]);

    const handleDaysConversion = () => {
        const { recurrenceDays } = formData;
        return recurrenceDays.reduce((res, item) => res + DAYS_FLAGGED[item], 0);
    };

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
    }, [operativesObj]);

    const isWeekly = formData.recurrenceType === RECURRING_TYPE.WEEKLY;

    const onSubmit = () => {
        const postBody = { ...formData, recurrenceDays: handleDaysConversion() };

        dispatch(editPinTaskSeries(id, postBody));
    };

    const handleDeleteSeries = () => {
        dispatch(
            showModal(CONFIRM_DELETE, {
                message: 'Are you sure you want to delete this task.',
                handleDelete: () => {
                    dispatch(deletePinTaskSeries(id));
                    closeModal();
                },
            }),
        );
    };

    const closeModal = () => dispatch(hideModal(EDIT_PIN_TASK_SERIES));

    return {
        formData,
        handleChange,
        closeModal,
        isFetching: pinTasksIsFetching || operativesIsFetching,
        isPosting: pinTasksIsPosting,
        error: pinTasksError,
        onSubmit,
        pinTaskSeries,
        handleDeleteSeries,
        operatives,
        isWeekly,
    };
};

export default useEditPinTaskSeries;

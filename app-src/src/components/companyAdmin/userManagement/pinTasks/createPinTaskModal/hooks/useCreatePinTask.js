import { useForm, usePrevious } from 'helpers/hooks';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import createPinTasks from 'actions/companyAdmin/pinTasks/async/createPinTasks';
import clearFieldErrors from 'actions/shared/generic/fieldErrors/sync/clearFieldErrors';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import fetchPinTasks from 'actions/companyAdmin/pinTasks/async/fetchPinTasks';

import {
    selectPinTasksIsPosting,
    selectPinTasksPostSuccess,
} from 'selectors/companyAdmin/pinTasks';
import { selectCompanyUserID } from 'selectors/companyAdmin/companyUsers';

import { RECURRING_TYPE } from 'constants/companyAdmin/enums';
import { CREATE_PIN_TASK } from 'constants/shared/modalTypes';
import { DAYS_FLAGGED } from 'constants/companyAdmin/enums';

const useCreatePinTask = (initialDate, startDate) => {
    const dispatch = useDispatch();
    const [step, setStep] = useState(0);

    const [formData, handleChange] = useForm({
        date: initialDate ?? new Date().toISOString(),
        endDate: initialDate ?? new Date().toISOString(),
        recurring: RECURRING_TYPE.NONE,
        days: [],
        operative: null,
        site: null,
        building: null,
        floor: null,
        drawing: null,
        service: null,
        template: null,
        pins: [],
    });

    const isRecurring = formData.recurring !== RECURRING_TYPE.NONE;
    const isWeekly = formData.recurring === RECURRING_TYPE.WEEKLY;
    const isMonthly = formData.recurring === RECURRING_TYPE.MONTHLY;

    const isPosting = useSelector(selectPinTasksIsPosting);
    const postSuccess = useSelector(selectPinTasksPostSuccess);
    const prevPostSuccess = usePrevious(postSuccess);
    const companyUserID = useSelector(selectCompanyUserID);

    useEffect(() => {
        if (!isWeekly) {
            handleChange('days', []);
            dispatch(removeFieldError('days'));
        }
    }, [isWeekly]);

    useEffect(() => {
        dispatch(clearFieldErrors());
    }, [dispatch, step]);

    useEffect(() => {
        if (postSuccess && !prevPostSuccess) {
            dispatch(fetchPinTasks(startDate, moment(startDate).add(1, 'month').format()));
            closeModal();
        }
    }, [postSuccess, prevPostSuccess]);

    const closeModal = () => dispatch(hideModal(CREATE_PIN_TASK));

    const handleDaysConversion = () => {
        const { days } = formData;

        return days.reduce((res, item) => res + DAYS_FLAGGED[item], 0);
    };

    const onNextStep = () => {
        if (step < 1) return setStep(step + 1);

        const { operative, pins, date, recurring, endDate } = formData;

        const data = {
            operative,
            pinIDs: pins,
            date,
            recurring,
            days: handleDaysConversion(),
            startDate: date,
            endDate,
            companyUserID,
        };

        dispatch(createPinTasks(data));
    };

    useEffect(() => {
        const { date, endDate } = formData;

        if (moment(date).isAfter(endDate, 'day')) handleChange('endDate', date);
    }, [formData.date, formData.endDate]);

    return {
        formData,
        handleChange,
        step,
        setStep,
        closeModal,
        isRecurring,
        isWeekly,
        isMonthly,
        onNextStep,
        isPosting,
    };
};

export default useCreatePinTask;

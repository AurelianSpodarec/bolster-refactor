import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import { RECURRING_TYPE } from 'constants/companyAdmin/enums';
import { CREATE_PIN_TASK } from 'constants/shared/modalTypes';
import { useForm } from 'helpers/hooks';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const useCreatePinTask = initialDate => {
    const dispatch = useDispatch();

    const [step, setStep] = useState(0);

    const [formData, handleChange] = useForm({
        date: initialDate ?? new Date(),
        recurring: RECURRING_TYPE.NONE,
        days: [],
        operatives: [],
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

    useEffect(() => {
        if (!isWeekly) {
            handleChange('days', []);
            dispatch(removeFieldError('days'));
        }
    }, [isWeekly]);

    const closeModal = () => dispatch(hideModal(CREATE_PIN_TASK));

    return {
        formData,
        handleChange,
        step,
        setStep,
        closeModal,
        isRecurring,
        isWeekly,
        isMonthly,
    };
};

export default useCreatePinTask;

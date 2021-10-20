import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import { EDIT_PIN_TASK } from 'constants/shared/modalTypes';
import { useForm } from 'helpers/hooks';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const useEditPinTask = date => {
    const dispatch = useDispatch();

    const [formData, handleChange] = useForm({
        date,
    });

    const closeModal = () => dispatch(hideModal(EDIT_PIN_TASK));

    const [isPosting, setIsPosting] = useState(false);

    const onSubmit = () => {
        setIsPosting(true);
        setTimeout(() => {
            setIsPosting(false);
            closeModal();
        }, 2000);
    };

    return {
        formData,
        handleChange,
        closeModal,
        isPosting,
        onSubmit,
    };
};

export default useEditPinTask;

import editPrelim from 'actions/companyAdmin/prelims/async/editPrelim';
import fetchPrelim from 'actions/companyAdmin/prelims/async/fetchPrelim';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import { EDIT_PRELIM_MODAL } from 'constants/shared/modalTypes';
import { useForm, usePrevious } from 'helpers/hooks';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectPrelimIsPosting,
    selectPrelimPostError,
    selectPrelimPostSuccess,
    selectSinglePrelim,
} from 'selectors/companyAdmin/prelims';

const useEditPrelim = id => {
    const dispatch = useDispatch();

    const prelim = useSelector(state => selectSinglePrelim(state, id));
    const prelimPostSuccess = useSelector(selectPrelimPostSuccess);
    const prelimPostError = useSelector(selectPrelimPostError);
    const prelimIsPosting = useSelector(selectPrelimIsPosting);
    const prevPinTasksPostSuccess = usePrevious(prelimPostSuccess);

    const [form, handleChange] = useForm({
        name: prelim?.name,
        type: prelim?.type,
        value: prelim?.value,
    });

    useEffect(() => {
        if (!prevPinTasksPostSuccess && prelimPostSuccess) closeModal();
    }, [prelimPostSuccess]);

    const closeModal = () => dispatch(hideModal(EDIT_PRELIM_MODAL));

    const handleSubmit = () => {
        dispatch(editPrelim(id, form));
    };

    return {
        form,
        handleChange,
        closeModal,
        isPosting: prelimIsPosting,
        error: prelimPostError,
        handleSubmit,
    };
};

export default useEditPrelim;

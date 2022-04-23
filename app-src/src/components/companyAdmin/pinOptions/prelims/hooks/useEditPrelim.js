import editPrelim from 'actions/companyAdmin/prelims/async/editPrelim';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import { PRELIMS_ENUM } from 'constants/companyAdmin/enums';
import { ERROR_MODAL } from 'constants/shared/modalTypes';
import { convertEnumToDropdownOptions } from 'helpers/generic';
import { useForm, usePrevious } from 'helpers/hooks';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectPrelimIsPosting,
    selectPrelimPostError,
    selectPrelimPostSuccess,
} from 'selectors/companyAdmin/prelims';

const useEditPrelim = set => {
    const dispatch = useDispatch();
    const isPosting = useSelector(selectPrelimIsPosting);
    const postError = useSelector(selectPrelimPostError);
    const postSuccess = useSelector(selectPrelimPostSuccess);
    const prevProps = usePrevious({ postError, postSuccess });
    const prelimsOptions = convertEnumToDropdownOptions(PRELIMS_ENUM);

    const [form, handleChange] = useForm({
        name: set?.name,
        type: set?.type,
        value: set?.value,
    });

    const handleSubmit = () => {
        dispatch(editPrelim(set.id, form));
    };

    useEffect(() => {
        if (postError && !prevProps.postError) dispatch(showModal(ERROR_MODAL));
    }, [postError, prevProps.postError]);

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) dispatch(hideModal());
    }, [postSuccess, prevProps.postSuccess]);

    return {
        form,
        handleChange,
        isPosting,
        handleSubmit,
        prelimsOptions,
    };
};

export default useEditPrelim;

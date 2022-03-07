import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import editJobReference from 'actions/companyAdmin/jobReferences/async/editJobReference';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import {
    selectJobReferencesIsPosting,
    selectJobReferencesPostError,
    selectJobReferencesPostSuccess,
} from 'selectors/companyAdmin/jobReferences';

import { ERROR_MODAL } from 'constants/shared/modalTypes';
import { useForm, usePrevious } from 'helpers/hooks';

const useCreateJobReference = jobReference => {
    const dispatch = useDispatch();

    const isPosting = useSelector(selectJobReferencesIsPosting);
    const postError = useSelector(selectJobReferencesPostError);
    const postSuccess = useSelector(selectJobReferencesPostSuccess);

    const prevProps = usePrevious({ postError, postSuccess });

    const [form, handleChange] = useForm({
        name: jobReference.name,
        description: jobReference.description ?? '',
    });

    const handleSubmit = () => {
        dispatch(editJobReference(jobReference.id, form));
    };

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) dispatch(hideModal());
    }, [postSuccess, prevProps.postSuccess]);

    useEffect(() => {
        if (postError && !prevProps.postError) dispatch(showModal(ERROR_MODAL));
    }, [postError, prevProps.postError]);

    return { isPosting, form, handleChange, handleSubmit };
};

export default useCreateJobReference;

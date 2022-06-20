import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import deleteJobReference from 'actions/companyAdmin/jobReferences/async/deleteJobReference';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import {
    selectJobReferencesIsPosting,
    selectJobReferencesPostError,
    selectJobReferencesPostSuccess,
} from 'selectors/companyAdmin/jobReferences';

import { ERROR_MODAL } from 'constants/shared/modalTypes';
import { usePrevious } from 'helpers/hooks';

const useDeleteJobReference = id => {
    const dispatch = useDispatch();

    const isPosting = useSelector(selectJobReferencesIsPosting);
    const postError = useSelector(selectJobReferencesPostError);
    const postSuccess = useSelector(selectJobReferencesPostSuccess);

    const prevProps = usePrevious({ postError, postSuccess });

    const handleSubmit = () => {
        dispatch(deleteJobReference(id));
    };

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) dispatch(hideModal());
    }, [postSuccess, prevProps.postSuccess]);

    useEffect(() => {
        if (postError && !prevProps.postError) dispatch(showModal(ERROR_MODAL));
    }, [postError, prevProps.postError]);

    return { isPosting, handleSubmit };
};

export default useDeleteJobReference;

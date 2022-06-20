import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    CONFIRM_DELETE,
    CREATE_JOB_REFERENCE,
    EDIT_JOB_REFERENCE,
    ERROR_MODAL,
} from 'constants/shared/modalTypes';
import { usePrevious } from 'helpers/hooks';

import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import deleteJobReference from 'actions/companyAdmin/jobReferences/async/deleteJobReference';
import enableJobReference from 'actions/companyAdmin/jobReferences/async/enableJobReference';
import disableJobReference from 'actions/companyAdmin/jobReferences/async/disableJobReference';
import {
    selectJobReferencesIsPosting,
    selectJobReferencesPostError,
    selectJobReferencesPostSuccess,
} from 'selectors/companyAdmin/jobReferences';

const useJobReferenceActions = () => {
    const dispatch = useDispatch();

    const isPosting = useSelector(selectJobReferencesIsPosting);
    const postError = useSelector(selectJobReferencesPostError);
    const postSuccess = useSelector(selectJobReferencesPostSuccess);

    const prevProps = usePrevious({ postError, postSuccess });

    const handleCreateJobReference = () => {
        dispatch(showModal(CREATE_JOB_REFERENCE));
    };

    const handleEditJobReference = jobReference => {
        dispatch(showModal(EDIT_JOB_REFERENCE, { jobReference }));
    };

    const handleDeleteJobReference = jobReference => {
        dispatch(
            showModal(CONFIRM_DELETE, {
                handleDelete: () => dispatch(deleteJobReference(jobReference.id)),
                title: `Delete ${jobReference.name}?`,
                message: 'Are you sure you would like to delete this job reference?',
            }),
        );
    };

    const handleEnableJobReference = jobReference => {
        if (!isPosting) dispatch(enableJobReference(jobReference));
    };

    const handleDisableJobReference = jobReference => {
        if (!isPosting) dispatch(disableJobReference(jobReference));
    };

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) dispatch(hideModal());
    }, [postSuccess, prevProps.postSuccess]);

    useEffect(() => {
        if (postError && !prevProps.postError) dispatch(showModal(ERROR_MODAL));
    }, [postError, prevProps.postError]);

    return {
        handleCreateJobReference,
        handleEditJobReference,
        handleDeleteJobReference,
        handleEnableJobReference,
        handleDisableJobReference,
    };
};

export default useJobReferenceActions;

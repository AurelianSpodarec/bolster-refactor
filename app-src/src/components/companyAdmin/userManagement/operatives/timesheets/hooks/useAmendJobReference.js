import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ERROR_MODAL } from 'constants/shared/modalTypes';
import { useForm, usePrevious } from 'helpers/hooks';
import { optionsFormat } from 'helpers/generic';

import patchClockerEntry from 'actions/companyAdmin/timesheets/async/patchClockerEntry';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import { selectJobReferences } from 'selectors/companyAdmin/jobReferences';
import {
    selectTimesheetsIsPosting,
    selectTimesheetsPostError,
    selectTimesheetsPostSuccess,
} from 'selectors/companyAdmin/timesheets';

const useAmendJobReference = ({ shiftID, oldJobRefID }) => {
    const dispatch = useDispatch();
    const jobReferences = useSelector(selectJobReferences);
    const isPosting = useSelector(selectTimesheetsIsPosting);
    const postError = useSelector(selectTimesheetsPostError);
    const postSuccess = useSelector(selectTimesheetsPostSuccess);

    const prevProps = usePrevious({ postError, postSuccess });

    const [form, handleChange] = useForm({
        newJobRefID: oldJobRefID,
    });

    const handleSubmit = () => {
        const postBody = {
            shiftID,
            oldJobRefID,
            newJobRefID: form.newJobRefID ? form.newJobRefID : null,
        };

        dispatch(patchClockerEntry(postBody));
    };

    const jobRefOptions = optionsFormat(jobReferences);

    useEffect(() => {
        if (postError && !prevProps.postError) dispatch(showModal(ERROR_MODAL));
    }, [postError, prevProps.postError]);

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) dispatch(hideModal());
    }, [postSuccess, prevProps.postSuccess]);

    return { form, handleChange, handleSubmit, jobRefOptions, isPosting };
};

export default useAmendJobReference;

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ERROR_MODAL } from 'constants/shared/modalTypes';
import { useForm, usePrevious } from 'helpers/hooks';

import duplicatePinOptionSet from 'actions/companyAdmin/pinOptions/async/duplicatePinOptionSet';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import {
    selectPinOptionSetsIsPosting,
    selectPinOptionSetsPostError,
    selectPinOptionSetsPostSuccess,
} from 'selectors/companyAdmin/pinOptionSets';

const useDuplicateOptionSet = set => {
    const dispatch = useDispatch();
    const isPosting = useSelector(selectPinOptionSetsIsPosting);
    const postError = useSelector(selectPinOptionSetsPostError);
    const postSuccess = useSelector(selectPinOptionSetsPostSuccess);

    const prevProps = usePrevious({ postError, postSuccess });

    const [form, handleChange] = useForm({
        name: set.name + ' (Copy)',
    });

    const handleSubmit = () => {
        dispatch(duplicatePinOptionSet(set.id, form));
    };

    useEffect(() => {
        if (postError && !prevProps.postError) dispatch(showModal(ERROR_MODAL));
    }, [postError, prevProps.postError]);

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) dispatch(hideModal());
    }, [postSuccess, prevProps.postSuccess]);

    return { form, handleChange, handleSubmit, isPosting };
};

export default useDuplicateOptionSet;

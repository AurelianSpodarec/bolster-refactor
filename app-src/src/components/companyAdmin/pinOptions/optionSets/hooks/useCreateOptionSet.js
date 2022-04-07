import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ERROR_MODAL } from 'constants/shared/modalTypes';
import { useForm, usePrevious } from 'helpers/hooks';

import createPinOptionSet from 'actions/companyAdmin/pinOptions/async/createPinOptionSet';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import {
    selectPinOptionSetsIsPosting,
    selectPinOptionSetsPostError,
} from 'selectors/companyAdmin/pinOptionSets';

const useCreateOptionSet = pinOptionTypeID => {
    const dispatch = useDispatch();
    const isPosting = useSelector(selectPinOptionSetsIsPosting);
    const postError = useSelector(selectPinOptionSetsPostError);

    const prevProps = usePrevious({ postError });

    const [form, handleChange] = useForm({
        name: '',
    });

    const handleSubmit = () => {
        const postBody = {
            ...form,
            pinOptionTypeID,
        };

        dispatch(createPinOptionSet(postBody));
    };

    useEffect(() => {
        if (postError && !prevProps.postError) dispatch(showModal(ERROR_MODAL));
    }, [postError, prevProps.postError]);

    return { form, handleChange, handleSubmit, isPosting };
};

export default useCreateOptionSet;

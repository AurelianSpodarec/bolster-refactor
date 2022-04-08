import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ERROR_MODAL } from 'constants/shared/modalTypes';
import { useForm } from 'helpers/hooks';

import showModal from 'actions/shared/generic/modals/sync/showModal';
import {
    selectPrelimIsPosting,
    selectPrelimPostError,
    selectPrelimPostSuccess,
} from 'selectors/companyAdmin/prelims';
import createPrelim from 'actions/companyAdmin/prelims/async/createPrelim';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';

const useCreatePrelim = () => {
    const dispatch = useDispatch();
    const isPosting = useSelector(selectPrelimIsPosting);
    const postError = useSelector(selectPrelimPostError);
    const postSuccess = useSelector(selectPrelimPostSuccess);

    const [form, handleChange] = useForm({
        name: '',
        type: null,
        value: null,
    });

    const handleSubmit = () => {
        const postBody = {
            ...form,
        };

        dispatch(createPrelim(postBody));
    };

    useEffect(() => {
        if (postError) dispatch(showModal(ERROR_MODAL));
    }, [postError]);

    useEffect(() => {
        if (postSuccess) dispatch(hideModal());
    }, [postSuccess]);

    return { form, handleChange, handleSubmit, isPosting };
};

export default useCreatePrelim;

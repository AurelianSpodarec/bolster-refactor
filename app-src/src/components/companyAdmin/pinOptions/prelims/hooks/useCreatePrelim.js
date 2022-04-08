import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ERROR_MODAL } from 'constants/shared/modalTypes';
import { useForm } from 'helpers/hooks';

import showModal from 'actions/shared/generic/modals/sync/showModal';
import { selectPrelimIsPosting, selectPrelimPostError } from 'selectors/companyAdmin/prelims';
import createPrelim from 'actions/companyAdmin/prelims/async/createPrelim';

const useCreatePrelim = () => {
    const dispatch = useDispatch();
    const isPosting = useSelector(selectPrelimIsPosting);
    const postError = useSelector(selectPrelimPostError);

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

    return { form, handleChange, handleSubmit, isPosting };
};

export default useCreatePrelim;

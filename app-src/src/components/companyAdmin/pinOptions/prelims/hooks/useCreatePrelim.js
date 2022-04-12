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
import { convertEnumToDropdownOptions } from 'helpers/generic';
import { PRELIMS_ENUM } from 'constants/companyAdmin/enums';

const useCreatePrelim = () => {
    const dispatch = useDispatch();
    const isPosting = useSelector(selectPrelimIsPosting);
    const postError = useSelector(selectPrelimPostError);
    const postSuccess = useSelector(selectPrelimPostSuccess);
    const prelimsOptions = convertEnumToDropdownOptions(PRELIMS_ENUM);

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

    return { form, handleChange, handleSubmit, isPosting, prelimsOptions };
};

export default useCreatePrelim;

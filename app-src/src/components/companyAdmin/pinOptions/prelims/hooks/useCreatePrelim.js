import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from 'helpers/hooks';
import { selectPrelimIsPosting } from 'selectors/companyAdmin/prelims';
import createPrelim from 'actions/companyAdmin/prelims/async/createPrelim';
import { convertEnumToDropdownOptions } from 'helpers/generic';
import { PRELIMS_ENUM } from 'constants/companyAdmin/enums';

const useCreatePrelim = () => {
    const dispatch = useDispatch();
    const isPosting = useSelector(selectPrelimIsPosting);
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

    return { form, handleChange, handleSubmit, isPosting, prelimsOptions };
};

export default useCreatePrelim;

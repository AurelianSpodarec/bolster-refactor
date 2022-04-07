import React from 'react';

import { useDispatch } from 'react-redux';
import { useForm } from 'helpers/hooks';

const useCreateOptionSet = pinOptionTypeID => {
    const dispatch = useDispatch();

    const [form, handleChange] = useForm({
        name: '',
    });

    const handleSubmit = () => {
        const postBody = {
            ...form,
            pinOptionTypeID,
        };

        console.log(postBody);
    };

    return { form, handleChange, handleSubmit };
};

export default useCreateOptionSet;

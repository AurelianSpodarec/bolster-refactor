import React from 'react';

import { useForm } from 'helpers/hooks';

const useCreateOptionValue = () => {
    const [form, handleChange] = useForm({
        name: '',
    });

    const handleSubmit = () => {
        console.log('submit...');
    };

    return { form, handleChange, handleSubmit };
};

export default useCreateOptionValue;

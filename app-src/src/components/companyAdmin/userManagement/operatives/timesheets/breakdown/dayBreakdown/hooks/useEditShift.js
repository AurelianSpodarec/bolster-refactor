import { useForm } from 'helpers/hooks';
import { useState } from 'react';

const useEditShift = shift => {
    const { overrideShiftTime, overrideWage } = shift;

    const [formData, handleChange] = useForm({
        overrideShiftTime: overrideShiftTime || '0:00',
        overrideWage: overrideWage || 0,
    });

    const handleSubmit = () => {};

    return {
        formData,
        handleChange,
        handleSubmit,
    };
};

export default useEditShift;

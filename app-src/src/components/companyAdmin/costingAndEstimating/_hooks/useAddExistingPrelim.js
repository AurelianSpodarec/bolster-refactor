import { useForm } from 'helpers/hooks';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useAddExistingPrelim = () => {
    const dispatch = useDispatch();

    const isPosting = false;
    const [form, handleChange] = useForm({
        description: '',
        amount: null,
    });

    const handleSubmit = () => {
        const postBody = {
            ...form,
        };
    };

    useEffect(() => {}, []);

    return { form, handleChange, handleSubmit, isPosting };
};

export default useAddExistingPrelim;

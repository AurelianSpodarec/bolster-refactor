import { useForm } from 'helpers/hooks';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { convertEnumToDropdownOptions } from '../../../../helpers/generic';
import { PRELIMS_ENUM } from '../../../../constants/companyAdmin/enums';

const useCreateCostingAndEstimatingPrelim = () => {
    const dispatch = useDispatch();
    const prelimsOptions = convertEnumToDropdownOptions(PRELIMS_ENUM);

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

    return { form, handleChange, handleSubmit, isPosting, prelimsOptions };
};

export default useCreateCostingAndEstimatingPrelim;

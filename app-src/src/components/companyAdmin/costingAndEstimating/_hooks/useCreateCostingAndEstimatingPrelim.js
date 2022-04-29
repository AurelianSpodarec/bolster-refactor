import { useForm } from 'helpers/hooks';
import { useDispatch } from 'react-redux';

import { convertEnumToDropdownOptions } from '../../../../helpers/generic';
import { PRELIMS_ENUM } from '../../../../constants/companyAdmin/enums';
import createPrelim from '../../../../actions/companyAdmin/prelims/async/createPrelim';

const useCreateCostingAndEstimatingPrelim = () => {
    const dispatch = useDispatch();
    const prelimsOptions = convertEnumToDropdownOptions(PRELIMS_ENUM);

    const isPosting = false;
    const [form, handleChange] = useForm({
        description: '',
        amount: null,
        type: null,
    });

    const handleSubmit = () => {
        const hierarchyID = null;

        const postBody = {
            ...form,
            hierarchyID,
        };

        dispatch(createPrelim(postBody));
    };

    return { form, handleChange, handleSubmit, isPosting, prelimsOptions };
};

export default useCreateCostingAndEstimatingPrelim;

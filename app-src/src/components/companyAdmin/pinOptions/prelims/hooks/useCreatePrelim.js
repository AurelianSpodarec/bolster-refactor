import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'helpers/hooks';

import { selectPrelimIsPosting } from 'selectors/companyAdmin/prelims';

import createHierarchyPrelim from '../../../../../actions/companyAdmin/costingAndEstimating/createHierarchyPrelim';

import { convertEnumToDropdownOptions } from 'helpers/generic';
import { PRELIMS_ENUM } from 'constants/companyAdmin/enums';

const useCreatePrelim = () => {
    const dispatch = useDispatch();
    const isPosting = useSelector(selectPrelimIsPosting);
    const prelimsOptions = convertEnumToDropdownOptions(PRELIMS_ENUM);

    const [form, handleChange] = useForm({
        hierarchyID: '',
        hierarchyType: '',
        name: '',
        type: null,
        value: null,
    });

    const handleSubmit = () => {
        const postBody = {
            ...form,
        };

        dispatch(createHierarchyPrelim(postBody));
    };

    return { form, handleChange, handleSubmit, isPosting, prelimsOptions };
};

export default useCreatePrelim;

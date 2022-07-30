import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, usePrevious } from 'helpers/hooks';
import useCurrentHierarchyID from '../../../costingAndEstimating/_hooks/useCurrentHierarchyID';
import useCurrentHierarchyType from '../../../costingAndEstimating/_hooks/useCurrentHierarchyType';

import { selectPrelimIsPosting, selectPrelimPostSuccess } from 'selectors/companyAdmin/prelims';

import createHierarchyPrelim from '../../../../../actions/companyAdmin/costingAndEstimating/createHierarchyPrelim';
import { hideModal } from '../../../../../actions/shared/generic/modals/sync/hideModal';

import { convertEnumToDropdownOptions } from 'helpers/generic';
import { PRELIMS_ENUM } from 'constants/companyAdmin/enums';

const useCreatePrelim = () => {
    const dispatch = useDispatch();

    const isPosting = useSelector(selectPrelimIsPosting);
    const postSuccess = useSelector(selectPrelimPostSuccess);
    const prevPostSuccess = usePrevious(postSuccess);

    const prelimsOptions = convertEnumToDropdownOptions(PRELIMS_ENUM);

    const hierarchyID = useCurrentHierarchyID();
    const hierarchyType = useCurrentHierarchyType();

    const [form, handleChange] = useForm({
        hierarchyID,
        hierarchyType,
        name: '',
        type: null,
        value: null,
    });

    useEffect(() => {
        if (postSuccess && !prevPostSuccess) {
            dispatch(hideModal());
        }
    }, [postSuccess, prevPostSuccess]);

    const handleSubmit = () => {
        const postBody = {
            ...form,
        };

        dispatch(createHierarchyPrelim(postBody));
    };

    return { form, handleChange, handleSubmit, isPosting, prelimsOptions };
};

export default useCreatePrelim;

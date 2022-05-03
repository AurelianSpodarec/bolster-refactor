import { useDispatch, useSelector } from 'react-redux';

import { useForm } from 'helpers/hooks';
import useCurrentHierarchyID from './useCurrentHierarchyID';
import useCurrentHierarchyType from './useCurrentHierarchyType';

import { convertEnumToDropdownOptions } from '../../../../helpers/generic';
import { PRELIMS_ENUM } from '../../../../constants/companyAdmin/enums';
import createCostingAndEstimatingPrelim from 'actions/companyAdmin/costingAndEstimating/createCostingAndEstimatingPrelim';
import { useEffect } from 'react';
import {
    selectCostingAndEstimatingIsPosting,
    selectCostingAndEstimatingPostError,
    selectCostingAndEstimatingPostSuccess,
} from 'selectors/companyAdmin/costingAndEstimating';
import usePrevious from 'hooks/usePrevious';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import { ERROR_MODAL } from 'constants/shared/modalTypes';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';

const useCreateCostingAndEstimatingPrelim = () => {
    const dispatch = useDispatch();
    const prelimsOptions = convertEnumToDropdownOptions(PRELIMS_ENUM);
    const hierarchyID = useCurrentHierarchyID();
    const hierarchyType = useCurrentHierarchyType();

    const isPosting = useSelector(selectCostingAndEstimatingIsPosting);
    const postError = useSelector(selectCostingAndEstimatingPostError);
    const postSuccess = useSelector(selectCostingAndEstimatingPostSuccess);
    const prevProps = usePrevious({ postError, postSuccess });

    const [form, handleChange] = useForm({
        name: '',
        value: null,
        type: null,
    });

    const handleSubmit = () => {
        form.value = parseInt(form.value);
        const postBody = {
            ...form,

            hierarchyID,
            hierarchyType,
        };

        dispatch(createCostingAndEstimatingPrelim(postBody));
    };

    useEffect(() => {
        if (postError && !prevProps.postError) dispatch(showModal(ERROR_MODAL));
    }, [postError, prevProps.postError]);

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) dispatch(hideModal());
    }, [postSuccess, prevProps.postSuccess]);

    return { form, handleChange, handleSubmit, isPosting, prelimsOptions };
};

export default useCreateCostingAndEstimatingPrelim;

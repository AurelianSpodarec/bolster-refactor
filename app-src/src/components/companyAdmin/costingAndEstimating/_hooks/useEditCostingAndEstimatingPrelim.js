import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import editLinkPrelim from 'actions/companyAdmin/costingAndEstimating/editLinkPrelim';
import { PRELIMS_ENUM } from 'constants/companyAdmin/enums';
import { convertEnumToDropdownOptions } from 'helpers/generic';
import { useForm, usePrevious } from 'helpers/hooks';
import {
    selectCostingAndEstimatingIsPosting,
    selectCostingAndEstimatingPostError,
    selectCostingAndEstimatingPostSuccess,
} from 'selectors/companyAdmin/costingAndEstimating';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import { ERROR_MODAL } from 'constants/shared/modalTypes';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';

const useEditCostingAndEstimatingPrelim = ({ prelim }) => {
    const dispatch = useDispatch();
    const isPosting = useSelector(selectCostingAndEstimatingIsPosting);
    const postError = useSelector(selectCostingAndEstimatingPostError);
    const postSuccess = useSelector(selectCostingAndEstimatingPostSuccess);
    const prevProps = usePrevious({ postError, postSuccess });
    const prelimsOptions = convertEnumToDropdownOptions(PRELIMS_ENUM);

    const [form, handleChange] = useForm({
        name: prelim?.prelimName,
        type: prelim?.type,
        value: prelim?.cost,
    });

    const postBody = {
        id: prelim?.prelimID,
        ...form,
    };

    const handleSubmit = () => {
        dispatch(editLinkPrelim(postBody));
    };

    useEffect(() => {
        if (postError && !prevProps.postError) dispatch(showModal(ERROR_MODAL));
    }, [postError, prevProps.postError]);

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) dispatch(hideModal());
    }, [postSuccess, prevProps.postSuccess]);

    return {
        form,
        handleChange,
        isPosting,
        handleSubmit,
        prelimsOptions,
    };
};

export default useEditCostingAndEstimatingPrelim;

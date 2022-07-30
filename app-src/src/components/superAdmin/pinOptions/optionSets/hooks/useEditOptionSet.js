import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ERROR_MODAL } from 'constants/shared/modalTypes';
import { useForm, usePrevious } from 'helpers/hooks';
import { formatCheckboxListOptions } from 'helpers/generic';

import editPinOptionSet from 'actions/superAdmin/pinOptions/async/editPinOptionSet';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import {
    selectPinOptionSetsIsPosting,
    selectPinOptionSetsPostError,
    selectPinOptionSetsPostSuccess,
} from 'selectors/superAdmin/pinOptionSets';
import { selectServicesArr } from 'selectors/superAdmin/services';

const useEditOptionSet = set => {
    const dispatch = useDispatch();
    const isPosting = useSelector(selectPinOptionSetsIsPosting);
    const postError = useSelector(selectPinOptionSetsPostError);
    const postSuccess = useSelector(selectPinOptionSetsPostSuccess);

    const services = useSelector(selectServicesArr);
    const serviceOptions = formatCheckboxListOptions(services);

    const prevProps = usePrevious({ postError, postSuccess });

    const [form, handleChange] = useForm({
        name: set.name,
        serviceIDs: set.serviceIDs || [],
    });

    const handleSubmit = () => {
        dispatch(editPinOptionSet(set.id, form));
    };

    useEffect(() => {
        if (postError && !prevProps.postError) dispatch(showModal(ERROR_MODAL));
    }, [postError, prevProps.postError]);

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) dispatch(hideModal());
    }, [postSuccess, prevProps.postSuccess]);

    return { form, handleChange, handleSubmit, isPosting, serviceOptions };
};

export default useEditOptionSet;

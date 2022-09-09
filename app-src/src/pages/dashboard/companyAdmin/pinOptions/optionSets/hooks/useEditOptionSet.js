import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ERROR_MODAL } from 'constants/shared/modalTypes';
import { useForm, usePrevious } from 'helpers/hooks';
import { formatCheckboxListOptions } from 'helpers/generic';

import editPinOptionSet from 'actions/companyAdmin/pinOptions/async/editPinOptionSet';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import {
    selectPinOptionSetsIsPosting,
    selectPinOptionSetsPostError,
    selectPinOptionSetsPostSuccess,
} from 'selectors/companyAdmin/pinOptionSets';
import { selectServicesArr } from 'selectors/companyAdmin/services';
import { selectSubscriptions } from '../../../../../../selectors/companyAdmin/companySubscription';

const useEditOptionSet = set => {
    const dispatch = useDispatch();
    const isPosting = useSelector(selectPinOptionSetsIsPosting);
    const postError = useSelector(selectPinOptionSetsPostError);
    const postSuccess = useSelector(selectPinOptionSetsPostSuccess);
    const { serviceIDs } = useSelector(selectSubscriptions);
    const services = useSelector(selectServicesArr).filter(service =>
        serviceIDs.includes(service.id),
    );
    const serviceOptions = formatCheckboxListOptions(services);
    const [servicesError, setServicesError] = useState(false);

    const prevProps = usePrevious({ postError, postSuccess });

    const [form, handleChange] = useForm({
        name: set.name,
        serviceIDs: set.serviceIDs || [],
    });

    const handleServicesChange = (name, value) => {
        if (servicesError) {
            setServicesError(false);
            handleChange(name, value);
        } else {
            handleChange(name, value);
        }
    };

    const handleSubmit = () => {
        if (!form.serviceIDs.length) {
            return setServicesError(true);
        }

        dispatch(editPinOptionSet(set.id, form));
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
        handleSubmit,
        isPosting,
        serviceOptions,
        servicesError,
        handleServicesChange,
    };
};

export default useEditOptionSet;

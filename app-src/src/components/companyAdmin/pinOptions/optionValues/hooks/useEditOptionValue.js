import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useForm, usePrevious } from 'helpers/hooks';
import { ERROR_MODAL } from 'constants/shared/modalTypes';

import createPinOptionValue from 'actions/companyAdmin/pinOptions/async/createPinOptionValue';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import {
    selectPinOptionsIsPosting,
    selectPinOptionsPostError,
    selectPinOptionsPostSuccess,
} from 'selectors/companyAdmin/pinOptions';
import { selectServicesArr } from 'selectors/companyAdmin/services';
import { selectPinOptionSets } from 'selectors/companyAdmin/pinOptionSets';
import { formatCheckboxListOptions } from 'helpers/generic';

const useEditOptionValue = (option, pinOptionTypeID) => {
    const dispatch = useDispatch();
    const isPosting = useSelector(selectPinOptionsIsPosting);
    const postError = useSelector(selectPinOptionsPostError);
    const postSuccess = useSelector(selectPinOptionsPostSuccess);

    const services = useSelector(selectServicesArr);
    const pinOptionSets = useSelector(selectPinOptionSets);
    const pinOptionSetID = option.pinOptionSetID;
    const pinServiceIDs =
        pinOptionSetID &&
        Object.values(pinOptionSets).find(set => set.id === option.pinOptionSetID).serviceIDs;
    const availableServices = services.filter(option => pinServiceIDs?.includes(option.id));
    const serviceOptions =
        availableServices.length > 0 ? formatCheckboxListOptions(availableServices) : [];

    const prevProps = usePrevious({ postError, postSuccess });

    const [form, handleChange] = useForm({
        name: option.name,
        shortName: option.shortName || '',
        serviceIDs: option.serviceIDs || [],
    });

    const handleSubmit = () => {
        const postBody = {
            ...form,
            pinOptionTypeID,
            pinOptionSetID,
        };
        dispatch(createPinOptionValue(postBody));
    };

    useEffect(() => {
        if (postError && !prevProps.postError) dispatch(showModal(ERROR_MODAL));
    }, [postError, prevProps.postError]);

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) dispatch(hideModal());
    }, [postSuccess, prevProps.postSuccess]);

    return { form, handleChange, handleSubmit, isPosting, serviceOptions };
};

export default useEditOptionValue;

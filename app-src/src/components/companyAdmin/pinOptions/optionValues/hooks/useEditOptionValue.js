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
import { selectLatestVersionForPinOption } from 'selectors/companyAdmin/pinOptionVersions';

const useEditOptionValue = (option, pinOptionTypeID) => {
    const dispatch = useDispatch();
    const isPosting = useSelector(selectPinOptionsIsPosting);
    const postError = useSelector(selectPinOptionsPostError);
    const postSuccess = useSelector(selectPinOptionsPostSuccess);
    const latestPinOptionVersion = useSelector(state =>
        selectLatestVersionForPinOption(state, option.id),
    );

    const pinOptionSetID = option.pinOptionSetID;

    const prevProps = usePrevious({ postError, postSuccess });

    const [form, handleChange] = useForm({
        name: latestPinOptionVersion.name || '',
        shortName: latestPinOptionVersion.shortName || '',
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

    return { form, handleChange, handleSubmit, isPosting };
};

export default useEditOptionValue;

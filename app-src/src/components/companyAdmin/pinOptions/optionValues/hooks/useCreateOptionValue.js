import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useForm, usePrevious } from 'helpers/hooks';
import {
    getFormArrayAfterObjAdd,
    getFormArrayAfterObjRemove,
    getFormArrayObjChange,
} from 'helpers/generic';
import { ERROR_MODAL } from 'constants/shared/modalTypes';

import createPinOptionValue from 'actions/companyAdmin/pinOptions/async/createPinOptionValue';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import {
    selectPinOptionsIsPosting,
    selectPinOptionsPostError,
    selectPinOptionsPostSuccess,
} from 'selectors/companyAdmin/pinOptions';

const priceBreakObj = {
    value: '',
    cost: '',
};

const useCreateOptionValue = (pinOptionTypeID, pinOptionSetID) => {
    const dispatch = useDispatch();
    const isPosting = useSelector(selectPinOptionsIsPosting);
    const postError = useSelector(selectPinOptionsPostError);
    const postSuccess = useSelector(selectPinOptionsPostSuccess);

    const prevProps = usePrevious({ postError, postSuccess });

    const [form, handleChange] = useForm({
        name: '',
        shortName: '',
        serviceIDs: [],
        measurementType: null,
        measurementPriceBreaks: [priceBreakObj],
    });

    const handlePriceBreakChange = (index, field, value) => {
        const arrayToUpdate = getFormArrayObjChange(
            index,
            field,
            value,
            form.measurementPriceBreaks,
        );

        handleChange('measurementPriceBreaks', arrayToUpdate);
    };

    const handleAddPriceBreak = () => {
        const arrayToUpdate = getFormArrayAfterObjAdd(form.measurementPriceBreaks, priceBreakObj);

        handleChange('measurementPriceBreaks', arrayToUpdate);
    };

    const handleRemovePriceBreak = index => {
        const arrayToUpdate = getFormArrayAfterObjRemove(form.measurementPriceBreaks, index);

        handleChange('measurementPriceBreaks', arrayToUpdate);
    };

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

    return {
        form,
        handleChange,
        handlePriceBreakChange,
        handleAddPriceBreak,
        handleRemovePriceBreak,
        handleSubmit,
        isPosting,
    };
};

export default useCreateOptionValue;

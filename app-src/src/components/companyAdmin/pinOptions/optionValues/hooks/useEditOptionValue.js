import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useForm, usePrevious } from 'helpers/hooks';
import { isEmpty } from 'helpers/generic';
import { ERROR_MODAL } from 'constants/shared/modalTypes';

import showModal from 'actions/shared/generic/modals/sync/showModal';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import editPinOptionValue from 'actions/companyAdmin/pinOptions/async/editPinOptionValue';
import {
    selectPinOptionsIsPosting,
    selectPinOptionsPostError,
    selectPinOptionsPostSuccess,
} from 'selectors/companyAdmin/pinOptions';
import { selectLatestVersionForPinOption } from 'selectors/companyAdmin/pinOptionVersions';
import { selectPinOptionType } from 'selectors/companyAdmin/pinOptionTypes';

import useUpdatePriceBreaks from './useUpdatePriceBreaks';

const useEditOptionValue = option => {
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const isPosting = useSelector(selectPinOptionsIsPosting);
    const postError = useSelector(selectPinOptionsPostError);
    const postSuccess = useSelector(selectPinOptionsPostSuccess);
    const latestPinOptionVersion = useSelector(state =>
        selectLatestVersionForPinOption(state, option.id),
    );

    const pinOptionType = useSelector(state => selectPinOptionType(state, option.pinOptionTypeID));

    const prevProps = usePrevious({ postError, postSuccess });

    const [form, handleChange] = useForm({
        name: latestPinOptionVersion.name || '',
        shortName: latestPinOptionVersion.shortName || '',
        serviceIDs: option.serviceIDs || [],
        measurementPriceBreaks: !isEmpty(option.priceBreaks)
            ? option.priceBreaks.map(priceBreak => {
                  return {
                      value: priceBreak.value,
                      cost: priceBreak.cost,
                  };
              })
            : [{ value: '', cost: '' }],
    });

    const { handlePriceBreakChange, handleAddPriceBreak, handleRemovePriceBreak } =
        useUpdatePriceBreaks(form, handleChange);

    const handleSubmit = () => {
        const { name, shortName, serviceIDs, measurementPriceBreaks } = form;

        const postBody = {
            name,
            shortName,
            serviceIDs,
        };

        if (pinOptionType.hasCosting) {
            const anyIncompletePriceBreaks = measurementPriceBreaks.some(
                ({ value, cost }) => (value && !cost) || (!value && cost),
            );

            if (anyIncompletePriceBreaks) {
                setError('There are incomplete measurements, please ensure these are complete.');
                return;
            }

            const priceBreaksWithoutEmpties = measurementPriceBreaks.filter(
                ({ value, cost }) => value && cost,
            );

            postBody.measurementPriceBreaks = priceBreaksWithoutEmpties;
        }

        dispatch(editPinOptionValue(option.id, postBody));
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
        error,
        setError,
    };
};

export default useEditOptionValue;

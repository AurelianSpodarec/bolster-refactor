import { useEffect, useState } from 'react';
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
import { selectPinOptionType } from 'selectors/companyAdmin/pinOptionTypes';

import useUpdatePriceBreaks from './useUpdatePriceBreaks';

const useCreateOptionValue = (pinOptionTypeID, pinOptionSetID) => {
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const isPosting = useSelector(selectPinOptionsIsPosting);
    const postError = useSelector(selectPinOptionsPostError);
    const postSuccess = useSelector(selectPinOptionsPostSuccess);

    const pinOptionType = useSelector(state => selectPinOptionType(state, pinOptionTypeID));

    const prevProps = usePrevious({ postError, postSuccess });

    const [form, handleChange] = useForm({
        name: '',
        shortName: '',
        serviceIDs: [],
        measurementType: null,
        measurementPriceBreaks: [
            {
                value: '',
                cost: '',
            },
        ],
    });

    const { handlePriceBreakChange, handleAddPriceBreak, handleRemovePriceBreak } =
        useUpdatePriceBreaks(form, handleChange);

    const handleSubmit = () => {
        const { name, shortName, serviceIDs, measurementType, measurementPriceBreaks } = form;

        const postBody = {
            name,
            shortName,
            serviceIDs,
            pinOptionTypeID,
            pinOptionSetID,
        };

        if (pinOptionType.hasCosting && measurementType) {
            const anyIncompletePriceBreaks = measurementPriceBreaks.some(
                ({ value, cost }) => (value && !cost) || (!value && cost),
            );

            const anyZeroOrNegativePriceBreaks = measurementPriceBreaks.some(priceBreak => {
                const { value, cost } = priceBreak;

                if (!value || !cost) return false;
                return value <= 0 || cost <= 0;
            });

            if (anyIncompletePriceBreaks) {
                setError('There are incomplete measurements, please ensure these are complete.');
                return;
            }

            if (anyZeroOrNegativePriceBreaks) {
                setError('Please ensure all measurement values and costs are greater than 0.');
                return;
            }

            const priceBreaksWithoutEmpties = measurementPriceBreaks.filter(
                ({ value, cost }) => value && cost,
            );

            postBody.measurementType = measurementType;
            postBody.measurementPriceBreaks = priceBreaksWithoutEmpties;
        }

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
        error,
        setError,
    };
};

export default useCreateOptionValue;

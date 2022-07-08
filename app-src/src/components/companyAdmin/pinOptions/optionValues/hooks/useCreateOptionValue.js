import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useForm, usePrevious } from 'helpers/hooks';
import { ERROR_MODAL } from 'constants/shared/modalTypes';
import { MEASUREMENT_TYPES } from 'constants/companyAdmin/enums';

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
import useGetAvailableServices from './useGetAvailableServices';

const useCreateOptionValue = (pinOptionTypeID, pinOptionSetID) => {
    const [error, setError] = useState(null);
    const [servicesError, setServicesError] = useState(false);

    const dispatch = useDispatch();
    const isPosting = useSelector(selectPinOptionsIsPosting);
    const postError = useSelector(selectPinOptionsPostError);
    const postSuccess = useSelector(selectPinOptionsPostSuccess);

    const pinOptionType = useSelector(state => selectPinOptionType(state, pinOptionTypeID));

    const initialPriceBreaks = [
        {
            value: '',
            cost: '',
            labourCost: '',
        },
    ];

    const [form, handleChange] = useForm({
        name: '',
        shortName: '',
        serviceIDs: [],
        measurementType: null,
        measurementPriceBreaks: initialPriceBreaks,
    });

    const prevProps = usePrevious({
        postError,
        postSuccess,
        measurementType: form.measurementType,
    });

    const disableAdd = +form.measurementType === MEASUREMENT_TYPES.FIXED;

    const { handlePriceBreakChange, handleAddPriceBreak, handleRemovePriceBreak } =
        useUpdatePriceBreaks(form, handleChange, disableAdd);

    const serviceOptions = useGetAvailableServices(pinOptionSetID);

    const handleSubmit = () => {
        const { name, shortName, serviceIDs, measurementType, measurementPriceBreaks } = form;

        let postBody = {
            name,
            shortName,
            serviceIDs,
            pinOptionTypeID,
            pinOptionSetID,
        };

        if (serviceOptions.length === 1) {
            postBody = { ...postBody, serviceIDs: [serviceOptions[0].value] };
        } else if (serviceOptions.length > 1 && !form.serviceIDs.length) {
            return setServicesError(true);
        }

        if (pinOptionType.hasCosting && measurementType) {
            const isFixed = +measurementType === MEASUREMENT_TYPES.FIXED;
            const anyIncompletePriceBreaks = measurementPriceBreaks.some(({ value, cost }) => {
                if (isFixed && !!cost) return false;
                if (!value && !cost) return false;
                if (!value || !cost) return true;
                return false;
            });

            const anyZeroOrNegativePriceBreaks = measurementPriceBreaks.some(priceBreak => {
                const { value, cost } = priceBreak;

                if (isFixed && !!cost) return cost <= 0;
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

            const priceBreaksWithoutEmpties = measurementPriceBreaks.filter(({ value, cost }) =>
                isFixed ? cost : value && cost,
            );

            const priceBreaksWithUpdatedCosts = priceBreaksWithoutEmpties.map(
                ({ value, cost, labourCost }) => ({
                    value: isFixed ? 1 : value,
                    cost,
                    labourCost: !labourCost || labourCost <= 0 ? 0 : labourCost,
                }),
            );

            postBody.measurementType = measurementType;
            postBody.measurementPriceBreaks = priceBreaksWithUpdatedCosts;
        }

        dispatch(createPinOptionValue(postBody));
    };

    const handleServicesChange = (name, value) => {
        if (servicesError) {
            setServicesError(false);
            handleChange(name, value);
        } else {
            handleChange(name, value);
        }
    };

    // only one measurement entry needed for fixed price
    useEffect(() => {
        if (+form.measurementType === MEASUREMENT_TYPES.FIXED) {
            const measurementFields = form.measurementPriceBreaks;
            measurementFields.splice(1);
            handleChange('measurementPriceBreaks', measurementFields);
        }
    }, [form.measurementType]);

    // reset price breaks when deselecting measurement unit
    useEffect(() => {
        if (!form.measurementType && prevProps.measurementType) {
            handleChange('measurementPriceBreaks', initialPriceBreaks);
        }
    }, [form.measurementType, prevProps.measurementType]);

    useEffect(() => {
        if (postError && !prevProps.postError) dispatch(showModal(ERROR_MODAL));
    }, [postError, prevProps.postError]);

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) dispatch(hideModal());
    }, [postSuccess, prevProps.postSuccess]);

    // check modifications
    const isNotModified =
        !form.name && !form.shortName && !form.measurementType && !form.serviceIDs.length;

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
        isNotModified,
        servicesError,
        handleServicesChange,
    };
};

export default useCreateOptionValue;

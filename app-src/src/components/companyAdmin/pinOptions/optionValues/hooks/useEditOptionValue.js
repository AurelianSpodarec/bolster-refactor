import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useForm, usePrevious } from 'helpers/hooks';
import { isEmpty } from 'helpers/generic';
import { ERROR_MODAL } from 'constants/shared/modalTypes';
import { MEASUREMENT_TYPES } from 'constants/companyAdmin/enums';

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

    const getInitialPriceBreak = () => {
        const emptyPriceBreak = { value: '', cost: '' };

        if (isEmpty(option.priceBreaks)) return [emptyPriceBreak];

        const priceBreaks = option.priceBreaks.map(priceBreak => {
            return {
                id: priceBreak.id,
                value: priceBreak.value,
                cost: priceBreak.cost,
            };
        });

        priceBreaks.sort((a, b) => a.value - b.value);

        if (option.costMeasurementType !== MEASUREMENT_TYPES.FIXED) {
            priceBreaks.push(emptyPriceBreak);
        }

        return priceBreaks;
    };

    const initialPriceBreaks = getInitialPriceBreak();

    const [form, handleChange] = useForm({
        name: latestPinOptionVersion.name || '',
        shortName: latestPinOptionVersion.shortName || '',
        serviceIDs: option.serviceIDs || [],
        measurementPriceBreaks: initialPriceBreaks,
        quickPriceEdit: '',
        costMeasurementType: option.costMeasurementType,
    });

    const disableAdd = +form.costMeasurementType === MEASUREMENT_TYPES.FIXED;

    const { handlePriceBreakChange, handleAddPriceBreak, handleRemovePriceBreak } =
        useUpdatePriceBreaks(form, handleChange, disableAdd);

    const handleQuickPriceEditChange = (name, percentageValue) => {
        handleChange(name, percentageValue);

        const updatedValues = form.measurementPriceBreaks.map(({ id, value, cost }) => {
            if (id) {
                const initialPriceBreak = initialPriceBreaks.find(
                    priceBreak => priceBreak.id === id,
                );

                const isValueSame = value + '' === initialPriceBreak.value + '';

                let newCost = cost;

                if (isValueSame) {
                    const valueNum = Number(percentageValue);

                    if (valueNum <= -100) {
                        newCost = '0';
                    } else {
                        const percentageChange = (valueNum / 100) * initialPriceBreak.cost;
                        newCost = initialPriceBreak.cost + percentageChange;
                    }
                }

                return {
                    id: initialPriceBreak.id,
                    value,
                    cost: newCost,
                };
            }

            return {
                value,
                cost,
            };
        });

        handleChange('measurementPriceBreaks', updatedValues);
    };

    const handleSubmit = () => {
        const { name, shortName, serviceIDs, measurementPriceBreaks, costMeasurementType } = form;

        const postBody = {
            name,
            shortName,
            serviceIDs,
        };

        if (pinOptionType.hasCosting && costMeasurementType) {
            const anyIncompletePriceBreaks = measurementPriceBreaks.some(priceBreak => {
                const { value, cost } = priceBreak;
                return (value && !cost) || (!value && cost);
            });

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

            postBody.costMeasurementType = option.costMeasurementType
                ? option.costMeasurementType
                : costMeasurementType;
            postBody.measurementPriceBreaks = priceBreaksWithoutEmpties;
        }

        dispatch(editPinOptionValue(option.id, postBody));
    };

    // only one measurement entry needed for fixed price
    useEffect(() => {
        if (+form.costMeasurementType === MEASUREMENT_TYPES.FIXED) {
            const measurementFields = form.measurementPriceBreaks;
            measurementFields.splice(1);
            handleChange('measurementPriceBreaks', measurementFields);
        }
    }, [form.costMeasurementType]);

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
        handleQuickPriceEditChange,
        handleSubmit,
        isPosting,
        error,
        setError,
    };
};

export default useEditOptionValue;

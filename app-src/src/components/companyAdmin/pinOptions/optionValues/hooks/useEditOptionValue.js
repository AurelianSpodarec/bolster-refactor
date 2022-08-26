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
    const [servicesError, setServicesError] = useState(false);

    const dispatch = useDispatch();
    const isPosting = useSelector(selectPinOptionsIsPosting);
    const postError = useSelector(selectPinOptionsPostError);
    const postSuccess = useSelector(selectPinOptionsPostSuccess);
    const latestPinOptionVersion = useSelector(state =>
        selectLatestVersionForPinOption(state, option.id),
    );

    const pinOptionType = useSelector(state => selectPinOptionType(state, option.pinOptionTypeID));

    const getInitialPriceBreak = () => {
        const emptyPriceBreak = { value: '', cost: '', labourCost: '' };

        if (isEmpty(option.priceBreaks)) return [emptyPriceBreak];

        const priceBreaks = option.priceBreaks.map(priceBreak => {
            return {
                id: priceBreak.id,
                value: priceBreak.value + '',
                cost: priceBreak.cost + '',
                labourCost: priceBreak.labourCost + '',
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

    const prevProps = usePrevious({
        postError,
        postSuccess,
        costMeasurementType: form.costMeasurementType,
    });

    const disableAdd = +form.costMeasurementType === MEASUREMENT_TYPES.FIXED;

    const { handlePriceBreakChange, handleAddPriceBreak, handleRemovePriceBreak } =
        useUpdatePriceBreaks(form, handleChange, disableAdd);

    const handleQuickPriceEditChange = (name, percentageValue) => {
        handleChange(name, percentageValue);

        const updatedValues = form.measurementPriceBreaks.map(({ id, value, cost, labourCost }) => {
            if (id) {
                const initialPriceBreak = initialPriceBreaks.find(
                    priceBreak => priceBreak.id === id,
                );

                const isValueSame = value + '' === initialPriceBreak.value + '';

                if (!percentageValue && isValueSame) {
                    return {
                        id: initialPriceBreak.id,
                        value: initialPriceBreak.value,
                        cost: initialPriceBreak.cost,
                        labourCost: initialPriceBreak.labourCost,
                    };
                }

                let newCost = cost;
                let newLabourCost = labourCost;

                if (isValueSame) {
                    const valueNum = Number(percentageValue);

                    if (valueNum <= -100) {
                        newCost = '0';
                        newLabourCost = '0';
                    } else {
                        const costAsNumber = Number(initialPriceBreak.cost);
                        const labourCostAsNumber = Number(initialPriceBreak.labourCost);
                        const costPercentageChange = (valueNum / 100) * costAsNumber;
                        const labourCostPercentageChange = (valueNum / 100) * labourCostAsNumber;
                        newCost = costAsNumber + costPercentageChange;
                        newLabourCost = labourCostAsNumber + labourCostPercentageChange;
                    }

                    if (newCost % 1 !== 0) {
                        newCost = newCost.toFixed(2);
                    }

                    if (newLabourCost % 1 !== 0) {
                        newLabourCost = newLabourCost.toFixed(2);
                    }
                }

                return {
                    id: initialPriceBreak.id,
                    value: value + '',
                    cost: newCost + '',
                    labourCost: newLabourCost + '',
                };
            }

            return {
                value: value + '',
                cost: cost + '',
                labourCost: labourCost + '',
            };
        });

        handleChange('measurementPriceBreaks', updatedValues);
    };

    const handleServicesChange = (name, value) => {
        if (servicesError) {
            setServicesError(false);
            handleChange(name, value);
        } else {
            handleChange(name, value);
        }
    };

    const handleSubmit = () => {
        const { name, shortName, serviceIDs, measurementPriceBreaks, costMeasurementType } = form;

        const postBody = {
            name,
            shortName,
            serviceIDs,
        };

        if (pinOptionType.hasCosting && costMeasurementType) {
            const isFixed = +costMeasurementType === MEASUREMENT_TYPES.FIXED;

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

            postBody.costMeasurementType = option.costMeasurementType
                ? option.costMeasurementType
                : costMeasurementType;
            postBody.measurementPriceBreaks = priceBreaksWithUpdatedCosts;
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

    // reset price breaks when deselecting measurement unit
    useEffect(() => {
        if (!form.costMeasurementType && prevProps.costMeasurementType) {
            handleChange('measurementPriceBreaks', initialPriceBreaks);
        }
    }, [form.costMeasurementType, prevProps.costMeasurementType]);

    useEffect(() => {
        if (postError && !prevProps.postError) dispatch(showModal(ERROR_MODAL));
    }, [postError, prevProps.postError]);

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) dispatch(hideModal());
    }, [postSuccess, prevProps.postSuccess]);

    // check modifications
    const isServiceIDsNotModified = !option.serviceIDs
        ? isEmpty(form.serviceIDs)
        : form.serviceIDs.every(id => option.serviceIDs.includes(id)) &&
          option.serviceIDs.every(id => form.serviceIDs.includes(id));

    const isMeasurementUnitNotModified = option.costMeasurementType
        ? form.costMeasurementType === option.costMeasurementType
        : !form.costMeasurementType;

    const isMeasurementNotModified =
        isMeasurementUnitNotModified &&
        JSON.stringify(form.measurementPriceBreaks) === JSON.stringify(initialPriceBreaks);

    const isShortNameNotModified = latestPinOptionVersion.shortName
        ? form.shortName === latestPinOptionVersion.shortName
        : !form.shortName;

    const isNotModified =
        form.name === latestPinOptionVersion.name &&
        isShortNameNotModified &&
        isServiceIDsNotModified &&
        isMeasurementNotModified;

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
        isMeasurementNotModified,
        isNotModified,
        handleServicesChange,
        servicesError,
    };
};

export default useEditOptionValue;

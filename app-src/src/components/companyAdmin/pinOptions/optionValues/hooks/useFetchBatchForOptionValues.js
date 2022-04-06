import React from 'react';

import { isEmpty } from 'helpers/generic';

import useFetchPinOptionsBatch from 'components/companyAdmin/hooks/useFetchPinOptionsBatch';
import useFetchServices from 'components/companyAdmin/hooks/useFetchServices';

const useFetchBatchForOptionValues = () => {
    const { services, isFetchingServices, servicesError } = useFetchServices();

    const {
        pinOptionTypes,
        isFetchingPinOptionTypes,
        pinOptionTypesFetchError,
        pinOptionSets,
        isFetchingPinOptionSets,
        pinOptionSetsFetchError,
        pinOptions,
        isFetchingPinOptions,
        pinOptionsFetchError,
        pinOptionVersions,
        isFetchingPinOptionVersions,
        pinOptionVersionsFetchError,
    } = useFetchPinOptionsBatch();

    const isAnyEmpty =
        (isEmpty(services) && isFetchingServices) ||
        (isEmpty(pinOptionTypes) && isFetchingPinOptionTypes) ||
        (isEmpty(pinOptionSets) && isFetchingPinOptionSets) ||
        (isEmpty(pinOptions) && isFetchingPinOptions) ||
        (isEmpty(pinOptionVersions) && isFetchingPinOptionVersions);

    const isAnyFetching =
        isFetchingServices ||
        isFetchingPinOptionTypes ||
        isFetchingPinOptionSets ||
        isFetchingPinOptions ||
        isFetchingPinOptionVersions;

    const isAnyErrored =
        servicesError ||
        pinOptionTypesFetchError ||
        pinOptionSetsFetchError ||
        pinOptionsFetchError ||
        pinOptionVersionsFetchError;

    return { isAnyEmpty, isAnyFetching, isAnyErrored };
};

export default useFetchBatchForOptionValues;

import { useEffect, useState } from 'react';

import { isEmpty } from 'helpers/generic';

import { usePrevious } from 'helpers/hooks';
import useFetchServices from '../../../hooks/useFetchServices';
import useFetchPinOptionsBatch from '../../../hooks/useFetchPinOptionsBatch';

const useFetchBatchForOptionValues = () => {
    const [hasFetched, setHasFetched] = useState(false);
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

    const prevProps = usePrevious({ isAnyFetching });

    useEffect(() => {
        if (isAnyFetching && !prevProps.isAnyFetching) setHasFetched(false);
        if (!isAnyFetching && prevProps.isAnyFetching) setHasFetched(true);
    }, [isAnyFetching, prevProps.isAnyFetching]);

    return { isAnyEmpty, isAnyFetching, isAnyErrored, hasFetched };
};

export default useFetchBatchForOptionValues;

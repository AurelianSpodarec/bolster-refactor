import React, { useEffect, useState } from 'react';

import { isEmpty } from 'helpers/generic';
import { usePrevious } from 'helpers/hooks';

import useFetchPinOptionsBatch from 'components/companyAdmin/hooks/useFetchPinOptionsBatch';
import useFetchServices from 'components/companyAdmin/hooks/useFetchServices';
import useFetchDocuments from 'components/companyAdmin/hooks/useFetchDocuments';

const useFetchBatchForOptionDocuments = optionID => {
    const [hasFetched, setHasFetched] = useState(false);
    const { services, isFetchingServices, servicesError } = useFetchServices();
    const { documents, isFetchingDocuments, documentsError } = useFetchDocuments(optionID);

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

export default useFetchBatchForOptionDocuments;

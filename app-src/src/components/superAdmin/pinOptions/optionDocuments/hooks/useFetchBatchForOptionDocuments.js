import { useEffect, useState } from 'react';
import useFetchServices from '../../../hooks/useFetchServices';
import useFetchPinOptionDocuments from './useFetchPinOptionDocuments';
import useFetchPinOptionsBatch from '../../../hooks/useFetchPinOptionsBatch';
import { isEmpty } from '../../../../../helpers/generic';
import { usePrevious } from '../../../../../helpers/hooks';

const useFetchBatchForOptionDocuments = () => {
    const [hasFetched, setHasFetched] = useState(false);
    const { services, isFetchingServices, servicesError } = useFetchServices();

    const { allDocuments, allDocumentsVersions, documentsError, isFetchingDocuments } =
        useFetchPinOptionDocuments();

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
        (isEmpty(pinOptionVersions) && isFetchingPinOptionVersions) ||
        (isEmpty(allDocuments) && isEmpty(allDocumentsVersions) && isFetchingDocuments);

    const isAnyFetching =
        isFetchingServices ||
        isFetchingPinOptionTypes ||
        isFetchingPinOptionSets ||
        isFetchingPinOptions ||
        isFetchingPinOptionVersions ||
        isFetchingDocuments;

    const isAnyErrored =
        servicesError ||
        pinOptionTypesFetchError ||
        pinOptionSetsFetchError ||
        pinOptionsFetchError ||
        pinOptionVersionsFetchError ||
        documentsError;

    const prevProps = usePrevious({ isAnyFetching });

    useEffect(() => {
        if (isAnyFetching && !prevProps.isAnyFetching) setHasFetched(false);
        if (!isAnyFetching && prevProps.isAnyFetching) setHasFetched(true);
    }, [isAnyFetching, prevProps.isAnyFetching]);

    return {
        isAnyEmpty,
        isAnyFetching,
        isAnyErrored,
        hasFetched,
        allDocuments,
        allDocumentsVersions,
    };
};

export default useFetchBatchForOptionDocuments;

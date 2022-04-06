import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import fetchPinOptionTypes from 'actions/companyAdmin/pinOptions/async/fetchPinOptionTypes';
import {
    selectPinOptionTypes,
    selectPinOptionTypesFetchError,
    selectPinOptionTypesIsFetching,
} from 'selectors/companyAdmin/pinOptionTypes';

const useFetchPinOptionTypes = () => {
    const dispatch = useDispatch();
    const pinOptionTypes = useSelector(selectPinOptionTypes);
    const isFetchingPinOptionTypes = useSelector(selectPinOptionTypesIsFetching);
    const pinOptionTypesFetchError = useSelector(selectPinOptionTypesFetchError);

    useEffect(() => {
        dispatch(fetchPinOptionTypes());
    }, [dispatch]);

    return { pinOptionTypes, isFetchingPinOptionTypes, pinOptionTypesFetchError };
};

export default useFetchPinOptionTypes;

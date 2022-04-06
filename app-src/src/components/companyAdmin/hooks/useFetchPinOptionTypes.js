import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import fetchPinOptionTypes from 'actions/companyAdmin/pinOptions/async/fetchPinOptionTypes';
import {
    selectPinOptionTypes,
    selectPinOptionTypesError,
    selectPinOptionTypesIsFetching,
} from 'selectors/companyAdmin/pinOptionTypes';

const useFetchPinOptionTypes = () => {
    const dispatch = useDispatch();
    const pinOptionTypes = useSelector(selectPinOptionTypes);
    const isFetchingPinOptionTypes = useSelector(selectPinOptionTypesIsFetching);
    const pinOptionTypesError = useSelector(selectPinOptionTypesError);

    useEffect(() => {
        dispatch(fetchPinOptionTypes());
    }, [dispatch]);

    return { pinOptionTypes, isFetchingPinOptionTypes, pinOptionTypesError };
};

export default useFetchPinOptionTypes;

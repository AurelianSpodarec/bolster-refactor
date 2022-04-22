import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchPinOptionTypes from '../../../actions/superAdmin/pinOptions/async/fetchPinOptionTypes';

const useFetchPinOptionTypes = () => {
    const dispatch = useDispatch();
    const pinOptionTypes = useSelector(selectPinOptionTypes);
    const pinOptionTypesArr = useSelector(selectPinOptionTypesArr);
    const isFetchingPinOptionTypes = useSelector(selectPinOptionTypesIsFetching);
    const pinOptionTypesFetchError = useSelector(selectPinOptionTypesFetchError);

    useEffect(() => {
        dispatch(fetchPinOptionTypes());
    }, [dispatch]);

    return {
        pinOptionTypes,
        pinOptionTypesArr,
        isFetchingPinOptionTypes,
        pinOptionTypesFetchError,
    };
};

export default useFetchPinOptionTypes;

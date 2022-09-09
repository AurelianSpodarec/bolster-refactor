import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import fetchPinOptions from 'actions/companyAdmin/pinOptions/async/fetchPinOptions';
import {
    selectPinOptions,
    selectPinOptionsArr,
    selectPinOptionsFetchError,
    selectPinOptionsIsFetching,
} from 'selectors/companyAdmin/pinOptions';

const useFetchPinOptions = () => {
    const dispatch = useDispatch();
    const pinOptions = useSelector(selectPinOptions);
    const pinOptionsArr = useSelector(selectPinOptionsArr);
    const isFetchingPinOptions = useSelector(selectPinOptionsIsFetching);
    const pinOptionsFetchError = useSelector(selectPinOptionsFetchError);

    useEffect(() => {
        dispatch(fetchPinOptions());
    }, [dispatch]);

    return {
        pinOptions,
        pinOptionsArr,
        isFetchingPinOptions,
        pinOptionsFetchError,
    };
};

export default useFetchPinOptions;

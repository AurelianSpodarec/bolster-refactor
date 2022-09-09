import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import fetchPinOptionVersions from 'actions/companyAdmin/pinOptions/async/fetchPinOptionVersions';
import {
    selectPinOptionVersions,
    selectPinOptionVersionsArr,
    selectPinOptionVersionsFetchError,
    selectPinOptionVersionsIsFetching,
} from 'selectors/companyAdmin/pinOptionVersions';

const useFetchPinOptionVersions = () => {
    const dispatch = useDispatch();
    const pinOptionVersions = useSelector(selectPinOptionVersions);
    const pinOptionVersionsArr = useSelector(selectPinOptionVersionsArr);
    const isFetchingPinOptionVersions = useSelector(selectPinOptionVersionsIsFetching);
    const pinOptionVersionsFetchError = useSelector(selectPinOptionVersionsFetchError);

    useEffect(() => {
        dispatch(fetchPinOptionVersions());
    }, [dispatch]);

    return {
        pinOptionVersions,
        pinOptionVersionsArr,
        isFetchingPinOptionVersions,
        pinOptionVersionsFetchError,
    };
};

export default useFetchPinOptionVersions;

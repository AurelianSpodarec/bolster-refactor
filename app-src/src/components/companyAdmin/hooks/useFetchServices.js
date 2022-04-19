import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import fetchAllServices from 'actions/companyAdmin/services/async/fetchAllServices';
import {
    selectServices,
    selectServicesIsFetching,
    selectServicesFetchError,
} from 'selectors/companyAdmin/services';

const useFetchServices = () => {
    const dispatch = useDispatch();
    const services = useSelector(selectServices);
    const isFetchingServices = useSelector(selectServicesIsFetching);
    const servicesError = useSelector(selectServicesFetchError);

    useEffect(() => {
        dispatch(fetchAllServices());
    }, [dispatch]);

    return { services, isFetchingServices, servicesError };
};

export default useFetchServices;

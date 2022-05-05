import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import fetchAllServices from '../../../actions/superAdmin/services/async/fetchAllServices';
import {
    selectServices,
    selectServicesFetchError,
    selectServicesIsFetching,
} from '../../../selectors/superAdmin/services';

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

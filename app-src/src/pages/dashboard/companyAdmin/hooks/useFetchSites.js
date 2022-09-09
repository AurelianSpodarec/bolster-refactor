import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    selectSites,
    selectSitesFetchError,
    selectSitesIsFetching,
} from 'selectors/companyAdmin/sites';
import fetchAllSites from 'actions/companyAdmin/sites/async/fetchAllSites';

const useFetchSites = () => {
    const dispatch = useDispatch();

    const isFetching = useSelector(selectSitesIsFetching);
    const error = useSelector(selectSitesFetchError);
    const sites = useSelector(selectSites);

    useEffect(() => {
        dispatch(fetchAllSites());
    }, [dispatch]);

    return { sites, isFetching, error };
};

export default useFetchSites;

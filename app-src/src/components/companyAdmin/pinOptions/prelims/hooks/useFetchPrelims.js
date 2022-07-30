import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectPrelimsArr,
    selectPrelimsFetchError,
    selectPrelimsIsFetching,
} from 'selectors/companyAdmin/prelims';
import fetchAllPrelims from 'actions/companyAdmin/prelims/async/fetchAllPrelims';

const useFetchPrelims = () => {
    const dispatch = useDispatch();
    const allPrelims = useSelector(selectPrelimsArr);
    const isFetchingPrelims = useSelector(selectPrelimsIsFetching);
    const prelimsError = useSelector(selectPrelimsFetchError);

    useEffect(() => {
        dispatch(fetchAllPrelims());
    }, [dispatch]);

    return { allPrelims, prelimsError, isFetchingPrelims };
};

export default useFetchPrelims;

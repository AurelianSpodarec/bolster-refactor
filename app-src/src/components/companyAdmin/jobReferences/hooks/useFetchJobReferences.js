import fetchJobReferences from 'actions/companyAdmin/jobReferences/async/fetchJobReferences';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    selectJobReferences,
    selectJobReferencesIsFetching,
    selectJobReferencesFetchError,
} from 'selectors/companyAdmin/jobReferences';

const useFetchJobReferences = () => {
    const dispatch = useDispatch();

    const jobReferences = useSelector(selectJobReferences);
    const isFetching = useSelector(selectJobReferencesIsFetching);
    const fetchError = useSelector(selectJobReferencesFetchError);

    useEffect(() => {
        dispatch(fetchJobReferences());
    }, [dispatch]);

    return { jobReferences, isFetching, fetchError };
};

export default useFetchJobReferences;

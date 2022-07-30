import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import fetchPinOptionSets from 'actions/companyAdmin/pinOptions/async/fetchPinOptionSets';
import {
    selectPinOptionSets,
    selectPinOptionSetsArr,
    selectPinOptionSetsFetchError,
    selectPinOptionSetsIsFetching,
} from 'selectors/companyAdmin/pinOptionSets';

const useFetchPinOptionSets = () => {
    const dispatch = useDispatch();
    const pinOptionSets = useSelector(selectPinOptionSets);
    const pinOptionSetsArr = useSelector(selectPinOptionSetsArr);
    const isFetchingPinOptionSets = useSelector(selectPinOptionSetsIsFetching);
    const pinOptionSetsFetchError = useSelector(selectPinOptionSetsFetchError);

    useEffect(() => {
        dispatch(fetchPinOptionSets());
    }, [dispatch]);

    return { pinOptionSets, pinOptionSetsArr, isFetchingPinOptionSets, pinOptionSetsFetchError };
};

export default useFetchPinOptionSets;

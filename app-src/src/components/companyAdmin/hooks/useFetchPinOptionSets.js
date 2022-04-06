import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import fetchPinOptionSets from 'actions/companyAdmin/pinOptions/async/fetchPinOptionSets';
import {
    selectPinOptionSets,
    selectPinOptionSetsError,
    selectPinOptionSetsIsFetching,
} from 'selectors/companyAdmin/pinOptionSets';

const useFetchPinOptionSets = typeID => {
    const dispatch = useDispatch();
    const pinOptionSets = useSelector(selectPinOptionSets);
    const isFetchingPinOptionSets = useSelector(selectPinOptionSetsIsFetching);
    const pinOptionSetsError = useSelector(selectPinOptionSetsError);

    useEffect(() => {
        dispatch(fetchPinOptionSets(typeID));
    }, [dispatch, typeID]);

    return { pinOptionSets, isFetchingPinOptionSets, pinOptionSetsError };
};

export default useFetchPinOptionSets;

import { useEffect } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';

import {
    selectPinOptionTypes,
    selectPinOptionTypesArr,
    selectPinOptionTypesFetchError,
    selectPinOptionTypesIsFetching,
} from '../../../selectors/superAdmin/pinOptionTypes';
import {
    selectPinOptionSets,
    selectPinOptionSetsArr,
    selectPinOptionSetsFetchError,
    selectPinOptionSetsIsFetching,
} from '../../../selectors/superAdmin/pinOptionSets';
import {
    selectPinOptions,
    selectPinOptionsArr,
    selectPinOptionsFetchError,
    selectPinOptionsIsFetching,
} from '../../../selectors/superAdmin/pinOptions';
import {
    selectPinOptionVersions,
    selectPinOptionVersionsArr,
    selectPinOptionVersionsFetchError,
    selectPinOptionVersionsIsFetching,
} from '../../../selectors/superAdmin/pinOptionVersions';

import fetchPinOptionTypes from '../../../actions/superAdmin/pinOptions/async/fetchPinOptionTypes';
import fetchPinOptionSets from '../../../actions/superAdmin/pinOptions/async/fetchPinOptionSets';
import fetchPinOptions from '../../../actions/superAdmin/pinOptions/async/fetchPinOptions';
import fetchPinOptionVersions from '../../../actions/superAdmin/pinOptions/async/fetchPinOptionVersions';

const useFetchPinOptionsBatch = () => {
    const dispatch = useDispatch();

    // types
    const pinOptionTypes = useSelector(selectPinOptionTypes);
    const pinOptionTypesArr = useSelector(selectPinOptionTypesArr);
    const isFetchingPinOptionTypes = useSelector(selectPinOptionTypesIsFetching);
    const pinOptionTypesFetchError = useSelector(selectPinOptionTypesFetchError);

    // sets
    const pinOptionSets = useSelector(selectPinOptionSets);
    const pinOptionSetsArr = useSelector(selectPinOptionSetsArr);
    const isFetchingPinOptionSets = useSelector(selectPinOptionSetsIsFetching);
    const pinOptionSetsFetchError = useSelector(selectPinOptionSetsFetchError);

    // options
    const pinOptions = useSelector(selectPinOptions);
    const pinOptionsArr = useSelector(selectPinOptionsArr);
    const isFetchingPinOptions = useSelector(selectPinOptionsIsFetching);
    const pinOptionsFetchError = useSelector(selectPinOptionsFetchError);

    // versions
    const pinOptionVersions = useSelector(selectPinOptionVersions);
    const pinOptionVersionsArr = useSelector(selectPinOptionVersionsArr);
    const isFetchingPinOptionVersions = useSelector(selectPinOptionVersionsIsFetching);
    const pinOptionVersionsFetchError = useSelector(selectPinOptionVersionsFetchError);

    useEffect(() => {
        batch(() => {
            dispatch(fetchPinOptionTypes());
            dispatch(fetchPinOptionSets());
            dispatch(fetchPinOptions());
            dispatch(fetchPinOptionVersions());
        });
    }, []);

    return {
        pinOptionTypes,
        pinOptionTypesArr,
        isFetchingPinOptionTypes,
        pinOptionTypesFetchError,
        pinOptionSets,
        pinOptionSetsArr,
        isFetchingPinOptionSets,
        pinOptionSetsFetchError,
        pinOptions,
        pinOptionsArr,
        isFetchingPinOptions,
        pinOptionsFetchError,
        pinOptionVersions,
        pinOptionVersionsArr,
        isFetchingPinOptionVersions,
        pinOptionVersionsFetchError,
    };
};

export default useFetchPinOptionsBatch;

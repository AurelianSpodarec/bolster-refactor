import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import fetchAllDropdownOptions from 'actions/companyAdmin/dropdownOptions/async/fetchAllDropdownOptions';
import { DROPDOWN_OPTION_VALS } from 'constants/companyAdmin/enums';

const { frRatings } = DROPDOWN_OPTION_VALS;

const useFetchFRRatings = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllDropdownOptions(frRatings));
    }, [dispatch]);
};

export default useFetchFRRatings;

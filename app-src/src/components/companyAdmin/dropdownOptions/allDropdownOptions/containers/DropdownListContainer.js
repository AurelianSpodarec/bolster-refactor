import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useLocalStorage } from 'helpers/hooks';

import {
    DROPDOWN_OPTION_LOOKUP,
    DROPDOWN_OPTIONS,
    DEFAULT_PIN_OPTIONS_SORT,
} from 'constants/companyAdmin/enums';

import fetchAllDropdownOptions from 'actions/companyAdmin/dropdownOptions/async/fetchAllDropdownOptions';

import DropdownList from '../presentational/DropdownList';
import fetchManufacturersByPinOptionType from 'actions/companyAdmin/manufacturers/async/fetchManufacturersByPinOptionType';

const DropdownListContainer = () => {
    const [sortValue, setSortValue] = useLocalStorage('sortValue', DEFAULT_PIN_OPTIONS_SORT.CUSTOM);
    const { type } = useParams();
    const dispatch = useDispatch();
    const { name } = DROPDOWN_OPTIONS[DROPDOWN_OPTION_LOOKUP[type]];

    useEffect(() => {
        dispatch(fetchManufacturersByPinOptionType(DROPDOWN_OPTION_LOOKUP[type]));
        dispatch(fetchAllDropdownOptions(DROPDOWN_OPTION_LOOKUP[type]));
    }, []);

    const handleSortChange = value => setSortValue(value);

    return (
        <DropdownList
            name={name}
            type={DROPDOWN_OPTION_LOOKUP[type]}
            selectedSortValue={sortValue}
            handleSortChange={handleSortChange}
        />
    );
};

export default DropdownListContainer;

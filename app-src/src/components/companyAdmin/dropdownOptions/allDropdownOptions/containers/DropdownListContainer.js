import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { PIN_OPTION_TYPES_LOOKUP, PIN_OPTION_TYPES } from 'constants/companyAdmin/enums';

import fetchAllDropdownOptions from 'actions/companyAdmin/dropdownOptions/async/fetchAllDropdownOptions';

import DropdownList from '../presentational/DropdownList';
import fetchManufacturersByPinOptionType from 'actions/companyAdmin/manufacturers/async/fetchManufacturersByPinOptionType';
import setIsSorting from 'actions/shared/sort/setIsSorting';
import toggleIsSorting from 'actions/shared/sort/toggleIsSorting';

const DropdownListContainer = () => {
    const { type } = useParams();
    const dispatch = useDispatch();
    const { name } = PIN_OPTION_TYPES[PIN_OPTION_TYPES_LOOKUP[type]];
    const isSorting = useSelector(state => state.shared.sortReducer.isSorting);

    useEffect(() => {
        dispatch(fetchManufacturersByPinOptionType(PIN_OPTION_TYPES_LOOKUP[type]));
        dispatch(fetchAllDropdownOptions(PIN_OPTION_TYPES_LOOKUP[type]));
        dispatch(setIsSorting(false));
    }, []);

    const handleToggleSort = useCallback(e => {
        e.preventDefault();
        dispatch(toggleIsSorting());
    });

    return (
        <DropdownList
            name={name}
            type={PIN_OPTION_TYPES_LOOKUP[type]}
            isSorting={isSorting}
            toggleIsSorting={handleToggleSort}
        />
    );
};

export default DropdownListContainer;

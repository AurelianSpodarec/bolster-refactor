import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { DROPDOWN_OPTION_LOOKUP, DROPDOWN_OPTIONS } from 'constants/companyAdmin/enums';

import fetchAllDropdownOptions from 'actions/companyAdmin/dropdownOptions/async/fetchAllDropdownOptions';

import DropdownList from '../presentational/DropdownList';
import fetchManufacturersByPinOptionType from 'actions/companyAdmin/manufacturers/async/fetchManufacturersByPinOptionType';
import setIsSorting from 'actions/shared/sort/setIsSorting';
import toggleIsSorting from 'actions/shared/sort/toggleIsSorting';

const DropdownListContainer = () => {
    const { type } = useParams();
    const dispatch = useDispatch();
    const { name } = DROPDOWN_OPTIONS[DROPDOWN_OPTION_LOOKUP[type]];
    const isSorting = useSelector(state => state.shared.sortReducer.isSorting);

    useEffect(() => {
        dispatch(fetchManufacturersByPinOptionType(DROPDOWN_OPTION_LOOKUP[type]));
        dispatch(fetchAllDropdownOptions(DROPDOWN_OPTION_LOOKUP[type]));
        dispatch(setIsSorting(false));
    }, []);

    const handleToggleSort = useCallback(e => {
        e.preventDefault();
        dispatch(toggleIsSorting());
    });

    return (
        <DropdownList
            name={name}
            type={DROPDOWN_OPTION_LOOKUP[type]}
            isSorting={isSorting}
            toggleIsSorting={handleToggleSort}
        />
    );
};

export default DropdownListContainer;

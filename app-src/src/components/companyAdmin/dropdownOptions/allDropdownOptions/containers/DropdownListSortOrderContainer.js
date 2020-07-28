import React from 'react';

import { DEFAULT_PIN_OPTIONS_SORT_NAMES } from 'constants/companyAdmin/enums';
import { convertEnumToDropdownOptions } from 'helpers/generic';

import DropdownListSortOrder from '../presentational/DropdownListSortOrder';

const DropdownListSortOrderContainer = ({ selectedSortValue, handleSortChange }) => {
    return (
        <DropdownListSortOrder
            options={getDropdownOptions()}
            selectedValue={selectedSortValue}
            handleChangeSortOrder={handleChangeSortOrder}
        />
    );

    function getDropdownOptions() {
        const options = convertEnumToDropdownOptions(DEFAULT_PIN_OPTIONS_SORT_NAMES);

        return options;
    }

    function handleChangeSortOrder(name, value) {
        handleSortChange(value);
    }
};

export default DropdownListSortOrderContainer;

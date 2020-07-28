import React, { useState } from 'react';

import DropdownListSortOrder from '../presentational/DropdownListSortOrder';
import { convertEnumToDropdownOptions } from 'helpers/generic';
import {
    DEFAULT_PIN_OPTIONS_SORT_NAMES,
    DEFAULT_PIN_OPTIONS_SORT,
} from 'constants/companyAdmin/enums';

const DropdownListSortOrderContainer = () => {
    const [selectedValue, handleChange] = useState(DEFAULT_PIN_OPTIONS_SORT.CUSTOM);

    return (
        <DropdownListSortOrder
            options={getDropdownOptions()}
            selectedValue={selectedValue}
            handleChangeSortOrder={handleChangeSortOrder}
        />
    );

    function getDropdownOptions() {
        const options = convertEnumToDropdownOptions(DEFAULT_PIN_OPTIONS_SORT_NAMES);

        return options;
    }

    function handleChangeSortOrder(name, value) {
        handleChange(value);
    }
};

export default DropdownListSortOrderContainer;

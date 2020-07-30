import React from 'react';

import Dropdown from 'components/shared/generic/form/presentational/Dropdown';

const DropdownListSortOrder = ({ options, selectedValue, handleChangeSortOrder }) => (
    <div className="dropdown-sort-container size-lg-12">
        <p className="sort-text pull-left">Sort by:</p>
        <div className="sort-input-container pull-left">
            <Dropdown
                name="sortOrder"
                value={selectedValue}
                options={Object.values(options)}
                selectedOption={options[selectedValue]}
                handleChange={handleChangeSortOrder}
                withoutPlaceholder
            />
        </div>
    </div>
);

export default DropdownListSortOrder;

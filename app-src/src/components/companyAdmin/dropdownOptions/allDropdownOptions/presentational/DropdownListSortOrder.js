import React from 'react';

import Dropdown from 'components/shared/generic/form/presentational/Dropdown';

const DropdownListSortOrder = ({ options, selectedValue, handleChangeSortOrder }) => (
    <div className="pull-right" style={{ width: '200px', marginRight: '10px' }}>
        <Dropdown
            name="sortOrder"
            value={selectedValue}
            options={Object.values(options)}
            selectedOption={options[selectedValue]}
            handleChange={handleChangeSortOrder}
            withoutPlaceholder
        />
    </div>
);

export default DropdownListSortOrder;

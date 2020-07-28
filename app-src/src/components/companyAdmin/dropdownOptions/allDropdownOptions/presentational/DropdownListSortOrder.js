import React from 'react';

import Dropdown from 'components/shared/generic/form/presentational/Dropdown';

const DropdownListSortOrder = ({ options, selectedValue, handleChangeSortOrder }) => (
    <>
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
        <p className="pull-right" style={{ padding: '7px 5px 0 0' }}>
            Sort by:
        </p>
    </>
);

export default DropdownListSortOrder;

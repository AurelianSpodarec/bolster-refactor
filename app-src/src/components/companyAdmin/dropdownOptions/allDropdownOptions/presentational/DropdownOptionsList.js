import React from 'react';

import DropdownOptionsListItemContainer from '../containers/DropdownOptionsListItemContainer';

const DropdownOptionsList = ({ dropdownOptions, colCount, headers }) => {
    return dropdownOptions.map(option => (
        <DropdownOptionsListItemContainer
            key={option.id}
            option={option}
            colCount={colCount}
            headers={headers}
        />
    ));
};
export default DropdownOptionsList;

import React from 'react';

import DropdownOptionsListItemContainer from '../containers/DropdownOptionsListItemContainer';

const DropdownOptionsList = ({ dropdownOptions, colCount }) => {
    return dropdownOptions.map(option => (
        <DropdownOptionsListItemContainer
            key={option.id}
            option={option}
            colCount={colCount}
        />
    ));
};
export default DropdownOptionsList;

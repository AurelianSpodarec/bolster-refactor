import React from 'react';

import withDropZone from 'components/shared/dragDrop/hocs/withDropZone';
import DropdownOptionsListItemContainer from '../containers/DropdownOptionsListItemContainer';

const DropdownOptionsList = ({
    dropdownOptions,
    colCount,
    headers,
    type,
    forwardRef,
    moveItem,
    isSorting,
}) => (
    <tbody ref={forwardRef} className={isSorting ? 'sorting' : ''}>
        {dropdownOptions.map((option, i) => (
            <DropdownOptionsListItemContainer
                key={option.id}
                option={option}
                colCount={colCount}
                index={i}
                headers={headers}
                type={type}
                moveItem={moveItem}
            />
        ))}
    </tbody>
);
export default withDropZone(DropdownOptionsList, 'PIN_OPTION_TYPES');

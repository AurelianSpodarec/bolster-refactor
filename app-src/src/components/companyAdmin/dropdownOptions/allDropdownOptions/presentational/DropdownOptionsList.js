import React from 'react';

import withDropZone from 'components/shared/dragDrop/hocs/withDropZone';
import DropdownOptionsListItemContainer from '../containers/DropdownOptionsListItemContainer';

const DropdownOptionsList = ({
    dropdownOptions,
    colCount,
    headers,
    type,
    isCustomSort,
    forwardRef,
    isOver,
}) => (
    <tbody ref={isCustomSort ? forwardRef : null} className={isOver ? 'dragging' : ''}>
        {dropdownOptions.map((option, i) => (
            <DropdownOptionsListItemContainer
                key={option.id}
                option={option}
                colCount={colCount}
                index={i}
                headers={headers}
                type={type}
                isCustomSort={isCustomSort}
            />
        ))}
    </tbody>
);
export default withDropZone(DropdownOptionsList);

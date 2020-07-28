import React from 'react';

import withDropZone from 'components/shared/dragDrop/hocs/withDropZone';
import DropdownOptionsListItemContainer from '../containers/DropdownOptionsListItemContainer';

const DropdownOptionsList = ({ dropdownOptions, colCount, headers, forwardRef, isOver }) => (
    <tbody ref={forwardRef} className={isOver ? 'dragging' : ''}>
        {dropdownOptions.map((option, i) => (
            <DropdownOptionsListItemContainer
                key={option.id}
                option={option}
                colCount={colCount}
                index={i}
                headers={headers}
            />
        ))}
    </tbody>
);
export default withDropZone(DropdownOptionsList);

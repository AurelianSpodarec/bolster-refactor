import React from 'react';

import OptionValuesListItemContainer from '../containers/OptionValuesListItemContainer';
import withDropZone from 'components/shared/dragDrop/hocs/withDropZone';

const OptionValuesList = ({
    optionValues,
    colCount,
    headers,
    services,
    isCustomSort,
    forwardRef,
    isOver,
    moveItem,
}) => {
    return (
        <tbody ref={isCustomSort ? forwardRef : null} className={isOver ? 'dragging' : ''}>
            {optionValues.map((optionValue, i) => (
                <OptionValuesListItemContainer
                    key={optionValue.id}
                    optionValue={optionValue}
                    colCount={colCount}
                    headers={headers}
                    services={services}
                    isCustomSort={isCustomSort}
                    moveItem={moveItem}
                    index={i}
                    optionValues={optionValues}
                />
            ))}
        </tbody>
    );
};
export default withDropZone(OptionValuesList, 'MANUFACTURER_OPTION_VALUES');

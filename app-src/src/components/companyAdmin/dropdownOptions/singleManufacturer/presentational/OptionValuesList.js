import React from 'react';

import OptionValuesListItemContainer from '../containers/OptionValuesListItemContainer';
import withDropZone from 'components/shared/dragDrop/hocs/withDropZone';

const OptionValuesList = ({
    optionValues,
    colCount,
    headers,
    services,
    forwardRef,
    isOver,
    moveItem,
}) => {
    return (
        <tbody ref={forwardRef} className={isOver ? 'dragging' : ''}>
            {optionValues.map((optionValue, i) => (
                <OptionValuesListItemContainer
                    key={optionValue.id}
                    optionValue={optionValue}
                    colCount={colCount}
                    headers={headers}
                    services={services}
                    moveItem={moveItem}
                    index={i}
                    optionValues={optionValues}
                />
            ))}
        </tbody>
    );
};
export default withDropZone(OptionValuesList, 'MANUFACTURER_OPTION_VALUES');

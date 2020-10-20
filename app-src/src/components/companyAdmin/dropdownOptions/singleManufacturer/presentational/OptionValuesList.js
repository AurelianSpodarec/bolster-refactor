import React from 'react';
import { useSelector } from 'react-redux';

import OptionValuesListItemContainer from '../containers/OptionValuesListItemContainer';
import withDropZone from 'components/shared/dragDrop/hocs/withDropZone';

const OptionValuesList = ({ optionValues, colCount, headers, services, forwardRef, moveItem }) => {
    const isSorting = useSelector(state => state.shared.sortReducer.isSorting);

    return (
        <tbody ref={forwardRef} className={isSorting ? 'sorting' : ''}>
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

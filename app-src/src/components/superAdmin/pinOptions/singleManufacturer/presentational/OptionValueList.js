import React from 'react';

import OptionValueListItemContainer from '../containers/ManufacturerListItemContainer';

const OptionValueList = ({ optionValues, colCount, headers }) => {
    return optionValues.map(optionValue => (
        <OptionValueListItemContainer
            key={optionValue.id}
            optionValue={optionValue}
            colCount={colCount}
            headers={headers}
        />
    ));
};
export default OptionValueList;

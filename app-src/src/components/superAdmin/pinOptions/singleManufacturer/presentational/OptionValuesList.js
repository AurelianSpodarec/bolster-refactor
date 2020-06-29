import React from 'react';

import OptionValuesListItemContainer from '../containers/OptionValuesListItemContainer';

const OptionValuesList = ({ optionValues, colCount, headers, services }) => {
    return optionValues.map(optionValue => (
        <OptionValuesListItemContainer
            key={optionValue.id}
            optionValue={optionValue}
            colCount={colCount}
            headers={headers}
            services={services}
        />
    ));
};
export default OptionValuesList;

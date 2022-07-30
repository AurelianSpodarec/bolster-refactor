import React from 'react';
import FlexWrapper from '../generic/flexWrapper/FlexWrapper';

const FilterRow = ({ children, gap = 15 }) => (
    <FlexWrapper extraClasses="filter-row" justify="between" align="center" gap={gap}>
        {children}
    </FlexWrapper>
);

export default FilterRow;

import React from 'react';

const FilterRow = ({ children, gap = 15 }) => (
    <div className="filter-row flex-row width-12 justify-between align-center" style={{ gap }}>
        {children}
    </div>
);

export default FilterRow;

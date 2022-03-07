import React, { useMemo } from 'react';

import MenuItem from '../presentational/MenuItem';

const CompanyMenuItemContainer = ({ item, hover, setHoveredItem }) => {
    return <MenuItem item={item} hover={hover} setHoveredItem={setHoveredItem} />;
};

export default CompanyMenuItemContainer;

import React from 'react';

import MenuItem from '../presentational/MenuItem';

const CompanyMenuItemContainer = ({ item, hoveredItem, setHoveredItem }) => {
    return <MenuItem item={item} hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} />;
};

export default CompanyMenuItemContainer;

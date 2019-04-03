import React from 'react';

import AllOperativesListItem from '../presentational/AllOperativesListItem';

const AllOperativesListItemContainer = ({ user, colCount }) => (
    <AllOperativesListItem user={user} colCount={colCount} />
);

export default AllOperativesListItemContainer;

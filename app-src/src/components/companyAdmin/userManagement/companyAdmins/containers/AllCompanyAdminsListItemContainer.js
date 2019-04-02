import React from 'react';

import AllCompanyAdminsListItem from '../presentational/AllCompanyAdminsListItem';

const AllCompanyAdminsListItemContainer = ({ user, colCount }) => (
    <AllCompanyAdminsListItem user={user} colCount={colCount} />
);

export default AllCompanyAdminsListItemContainer;

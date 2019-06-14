import React from 'react';

import AllClientsListItem from '../presentational/AllClientsListItem';

const AllClientsListItemContainer = ({ user, colCount }) => {
    return <AllClientsListItem user={user} colCount={colCount} />;
};

export default AllClientsListItemContainer;

import React from 'react';

import AllOperativesListItemContainer from '../containers/AllOperativesListItemContainer';

const AllOperativesList = ({ users, colCount }) =>
    users.map(user => (
        <AllOperativesListItemContainer
            key={user.id}
            user={user}
            colCount={colCount}
        />
    ));

export default AllOperativesList;

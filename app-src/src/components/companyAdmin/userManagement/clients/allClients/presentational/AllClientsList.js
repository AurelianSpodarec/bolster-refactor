import React from 'react';

import AllClientsListItemContainer from '../containers/AllClientsListItemContainer';

const AllClientsList = ({ users, colCount }) => {
    return users.map(user => (
        <AllClientsListItemContainer
            key={user.id}
            user={user}
            colCount={colCount}
        />
    ));
};
export default AllClientsList;

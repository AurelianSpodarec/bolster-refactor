import React from 'react';

import AllCompanyAdminsListItemContainer from '../containers/AllCompanyAdminsListItemContainer';

const AllCompanyAdminsList = ({ users, colCount }) =>
    users.map(user => (
        <AllCompanyAdminsListItemContainer
            key={user.id}
            users={user}
            colCount={colCount}
        />
    ));

export default AllCompanyAdminsList;

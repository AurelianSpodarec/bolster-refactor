import React from 'react';

import AllCompanyAdminsListItemContainer from '../containers/AllCompanyAdminsListItemContainer';

const AllCompanyAdminsList = ({ users, colCount }) => {
    return users.map(user => (
        <AllCompanyAdminsListItemContainer
            key={user.id}
            user={user}
            colCount={colCount}
        />
    ));
};
export default AllCompanyAdminsList;

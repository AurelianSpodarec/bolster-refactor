import React from 'react';

import AllCompanyAdminsListItemContainer from '../containers/AllCompanyAdminsListItemContainer';

const AllCompanyAdminsList = ({ users, colCount, showDeleteModal }) => {
    return users.map(user => (
        <AllCompanyAdminsListItemContainer
            key={user.id}
            user={user}
            colCount={colCount}
            showDeleteModal={showDeleteModal}
        />
    ));
};
export default AllCompanyAdminsList;

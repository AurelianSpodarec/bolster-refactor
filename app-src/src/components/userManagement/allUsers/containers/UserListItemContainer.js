import React from 'react';
import UserListItem from '../presentational/UserListItem';
const UserListItemContainer = ({ user, colCount }) => {
    return <UserListItem user={user} colCount={colCount} />;
};

export default UserListItemContainer;

import React from 'react';
import UserListItemContainer from '../containers/UserListItemContainer';

const UserList = ({ users, colCount }) =>
    users.map(user => (
        <UserListItemContainer key={user.id} colCount={colCount} user={user} />
    ));

export default UserList;

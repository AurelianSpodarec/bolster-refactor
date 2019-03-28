import React from 'react';
import UserListItemContainer from '../containers/UserListItemContainer';

const UserList = ({ users }) =>
    users.map(user => <UserListItemContainer key={user.id} user={user} />);

export default UserList;

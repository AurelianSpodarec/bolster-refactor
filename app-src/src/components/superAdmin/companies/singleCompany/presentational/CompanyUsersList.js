import React from 'react';
import CompanyUserListItemContainer from '../containers/CompanyUserListItemContainer';

const CompanyUsersList = ({ users }) => {
    return users.map(user => (
        <CompanyUserListItemContainer key={user.id} user={user} />
    ));
};

export default CompanyUsersList;

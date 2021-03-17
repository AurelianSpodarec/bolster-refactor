import React from 'react';
import CompanyUserListItemContainer from '../containers/CompanyUserListItemContainer';

const CompanyUsersList = ({ users }) =>
    users.map(user => {
        return <CompanyUserListItemContainer key={user.id} user={user} />;
    });

export default CompanyUsersList;

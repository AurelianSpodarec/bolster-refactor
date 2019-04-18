import React from 'react';
import CompanyUserListItem from '../presentational/CompanyUserListItem';

const CompanyUserListItemContainer = ({ user }) => {
    return <CompanyUserListItem user={user} />;
};

export default CompanyUserListItemContainer;

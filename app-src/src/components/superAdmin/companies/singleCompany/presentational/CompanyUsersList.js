import React from 'react';
import CompanyUserListItemContainer from '../containers/CompanyUserListItemContainer';

const CompanyUsersList = ({ users, tableColumnWidths }) =>
    users.map(user => {
        return (
            <CompanyUserListItemContainer
                key={user.id}
                user={user}
                tableColumnWidths={tableColumnWidths}
            />
        );
    });

export default CompanyUsersList;

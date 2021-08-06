import React from 'react';
import { useSelector } from 'react-redux';

import { COMPANY_USER_ROLE_IDS } from 'constants/companyAdmin/enums';
import { isEmpty } from 'helpers/generic';

import Table from 'components/shared/generic/tables/presentational/Table';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

const headers = [
    'Name',
    'Email address',
    'Role',
    'By company',
    'By user',
    'Date created',
    'User set up before?',
];

const UserCreationsTable = () => {
    const { users, isFetching, error } = useSelector(mapStateToProps);

    return (
        <Table
            withActions
            headers={headers}
            isFetching={isFetching}
            error={error}
            noData={isEmpty(users)}
            noDataMessage="No users to display"
        >
            {Object.values(users)
                .sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn))
                .map(user => (
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{COMPANY_USER_ROLE_IDS[user.type]}</td>
                        <td>{user.createdByCompanyName}</td>
                        <td>{user.createdByUserName}</td>
                        <td>
                            <DateTimeContainer date={user.createdOn} />
                        </td>
                        <td>{user.isNew ? 'No' : 'Yes'}</td>
                    </tr>
                ))}
        </Table>
    );
};

const mapStateToProps = ({
    superAdmin: {
        userCreationsReducer: { users, isFetching, error },
    },
}) => ({
    users,
    isFetching,
    error,
});

export default UserCreationsTable;

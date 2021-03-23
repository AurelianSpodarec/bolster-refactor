import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { isEmpty } from 'helpers/generic';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import Search from 'components/shared/generic/form/presentational/Search';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Table from 'components/shared/generic/tables/presentational/Table';
import DeletedCompanyAdminsListItem from './DeletedCompanyAdminsListItem';

const headers = ['Name', 'Email', ''];

const DeletedCompanyAdminsTable = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { users, isFetching, error } = useSelector(mapStateToProps);

    return (
        <>
            <BlockContainer>
                <Search
                    value={searchTerm}
                    placeholder="Search by name/email"
                    handleChange={handleChange}
                    name="searchTerm"
                />
            </BlockContainer>
            <BlockContainer isFetching={isFetching} error={error} isEmpty={isEmpty(users)}>
                <BlockHeading title="Deleted Admins" />
                <Table
                    withActions
                    headers={headers}
                    isFetching={isFetching}
                    error={error}
                    noData={isEmpty(users)}
                    noDataMessage="No admins to display."
                    extraClasses="large"
                >
                    {users.map(user => (
                        <DeletedCompanyAdminsListItem key={user.id} user={user} />
                    ))}
                </Table>
            </BlockContainer>
        </>
    );

    function handleChange(_, value) {
        setSearchTerm(value);
    }
};

const mapStateToProps = ({
    companyAdmin: {
        companyUsersReducer: { users, isFetching, error },
    },
}) => ({
    isFetching,
    error,
    users: Object.values(users),
});

export default DeletedCompanyAdminsTable;

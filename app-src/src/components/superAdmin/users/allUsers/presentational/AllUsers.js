import React from 'react';
import UserTableContainer from '../containers/UserTableContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import UsersFiltersContainer from '../containers/UsersFiltersContainer';

const AllUsers = () => (
    <>
        <PageHeading title="Users" withBackButton />
        <BlockContainer>
            <UsersFiltersContainer />
        </BlockContainer>
        <BlockContainer>
            <UserTableContainer />
        </BlockContainer>
    </>
);

export default AllUsers;

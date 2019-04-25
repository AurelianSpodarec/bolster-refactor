import React from 'react';
import UserTableContainer from '../containers/UserTableContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import UsersFiltersContainer from '../containers/UsersFiltersContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const AllUsers = () => (
    <>
        <PageHeading title="Users" withBackButton />
        <BlockContainer>
            <UsersFiltersContainer />
        </BlockContainer>
        <BlockContainer>
            <BlockHeading title="Users" />
            <UserTableContainer />
        </BlockContainer>
    </>
);

export default AllUsers;

import React from 'react';
import UserTableContainer from '../containers/UserTableContainer';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import UsersFiltersContainer from '../containers/UsersFiltersContainer';

const AllUsers = () => (
    <>
        <Breadcrumb breadcrumbs={[{ text: 'Users' }]} />
        <PageHeading title="Users" />
        <BlockContainer>
            <UsersFiltersContainer />
        </BlockContainer>
        <BlockContainer>
            <UserTableContainer />
        </BlockContainer>
    </>
);

export default AllUsers;

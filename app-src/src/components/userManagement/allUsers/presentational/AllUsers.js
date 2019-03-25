import React from 'react';
import { Link } from 'react-router-dom';
import UserTableContainer from '../containers/UserTableContainer';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const AllUsers = () => (
    <>
        <Breadcrumb breadcrumbs={[{ text: 'Users' }]} />
        <PageHeading title="Users">
            <Link to="/users/create" className="button">
                <i className="far fa-plus" />
                Add user
            </Link>
        </PageHeading>
        <BlockContainer>
            <UserTableContainer />
        </BlockContainer>
    </>
);

export default AllUsers;

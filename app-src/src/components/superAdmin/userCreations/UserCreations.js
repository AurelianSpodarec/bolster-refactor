import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import fetchUserCreations from 'actions/superAdmin/users/async/fetchUserCreations';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import UserCreationsTable from './UserCreationsTable';

const UserCreations = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserCreations());
    }, [dispatch]);

    return (
        <>
            <PageHeading title="User Creations" withBackButton />
            <BlockContainer>
                <p>Filter...</p>
            </BlockContainer>
            <BlockContainer>
                <UserCreationsTable />
            </BlockContainer>
        </>
    );
};

export default UserCreations;

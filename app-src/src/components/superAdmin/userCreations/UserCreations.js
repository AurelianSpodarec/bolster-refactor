import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import React from 'react';

const UserCreations = () => (
    <>
        <PageHeading title="User Creations" withBackButton />
        <BlockContainer>
            <p>Filter...</p>
        </BlockContainer>
        <BlockContainer>
            <p>Table...</p>
        </BlockContainer>
    </>
);

export default UserCreations;

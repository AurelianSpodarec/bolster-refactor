import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

import UserDrawingsTableContainer from '../containers/UserDrawingsTableContainer';

const UserDrawings = ({ title }) => (
    <>
        <PageHeading withBackButton title={title} />

        <BlockContainer>
            <BlockHeading title="User Drawings Access " />
            <p className="generic-text intro-text size-lg-12">
                Please check the drawing(s) you wish to remove access for this
                user.
            </p>
            <UserDrawingsTableContainer />
        </BlockContainer>
    </>
);

export default UserDrawings;

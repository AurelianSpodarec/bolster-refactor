import React from 'react';

import InviteClientToFloorContainer from '../containers/InviteClientToFloorContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';

const InviteClientToFloor = () => (
    <>
        <PageHeading leftChildren={true} title="Invite Client">
            <BackButtonContainer />
        </PageHeading>
        <InviteClientToFloorContainer />
    </>
);

export default InviteClientToFloor;

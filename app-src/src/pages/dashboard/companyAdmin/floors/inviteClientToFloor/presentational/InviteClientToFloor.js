import React from 'react';

import InviteClientToFloorContainer from '../containers/InviteClientToFloorContainer';
import PageHeading from 'components_DEPRECATED/shared/generic/pageHeading/presentational/PageHeading';

const InviteClientToFloor = () => (
    <>
        <PageHeading leftChildren={true} title="Invite Client" withBackButton />
        <InviteClientToFloorContainer />
    </>
);

export default InviteClientToFloor;

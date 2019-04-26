import React from 'react';

import InviteClientToBuildingContainer from '../containers/InviteClientToBuildingContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const InviteClientToBuilding = () => (
    <>
        <PageHeading leftChildren={true} title="Invite Client" withBackButton />
        <InviteClientToBuildingContainer />
    </>
);

export default InviteClientToBuilding;

import React from 'react';

import InviteClientToBuildingContainer from '../containers/InviteClientToBuildingContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';

const InviteClientToBuilding = () => (
    <>
        <PageHeading leftChildren={true} title="Invite Client">
            <BackButtonContainer />
        </PageHeading>
        <InviteClientToBuildingContainer />
    </>
);

export default InviteClientToBuilding;

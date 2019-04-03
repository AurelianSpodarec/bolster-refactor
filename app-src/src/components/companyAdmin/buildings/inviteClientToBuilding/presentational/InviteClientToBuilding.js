import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import InviteClientToBuildingContainer from '../containers/InviteClientToBuildingContainer';

const InviteClientToBuilding = () => (
    <div>
        <Breadcrumb breadcrumbs={[{ text: 'item 1' }, { text: 'item 2' }]} />
        <InviteClientToBuildingContainer />
    </div>
);

export default InviteClientToBuilding;

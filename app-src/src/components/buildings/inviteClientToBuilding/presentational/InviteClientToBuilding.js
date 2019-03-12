import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import InviteClientToBuildingFormContainer from '../containers/InviteClientToBuildingFormContainer';

const InviteClientToBuilding = () => (
    <div>
        <Breadcrumb breadcrumbs={[{ text: 'item 1' }, { text: 'item 2' }]} />
        <InviteClientToBuildingFormContainer />
    </div>
);

export default InviteClientToBuilding;

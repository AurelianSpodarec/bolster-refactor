import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import InviteClientToFloorFormContainer from '../containers/InviteClientToFloorFormContainer';

const InviteClientToFloor = () => (
    <div>
        <Breadcrumb breadcrumbs={[{ text: 'item 1' }, { text: 'item 2' }]} />
        <InviteClientToFloorFormContainer />
    </div>
);

export default InviteClientToFloor;

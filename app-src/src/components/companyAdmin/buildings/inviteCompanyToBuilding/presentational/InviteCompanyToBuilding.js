import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import InviteCompanyToBuildingContainer from '../containers/InviteCompanyToBuildingContainer';

const InviteCompanyToBuilding = () => (
    <div className="size-lg-12">
        <Breadcrumb breadcrumbs={[{ text: 'item 1' }, { text: 'item 2' }]} />
        <InviteCompanyToBuildingContainer />
    </div>
);

export default InviteCompanyToBuilding;

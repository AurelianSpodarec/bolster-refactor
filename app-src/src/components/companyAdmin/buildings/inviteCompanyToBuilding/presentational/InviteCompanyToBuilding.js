import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import InviteCompanyToBuildingFormContainer from '../containers/InviteCompanyToBuildingFormContainer';

const InviteCompanyToBuilding = () => (
    <div className="size-lg-12">
        <Breadcrumb breadcrumbs={[{ text: 'item 1' }, { text: 'item 2' }]} />
        <InviteCompanyToBuildingFormContainer />
    </div>
);

export default InviteCompanyToBuilding;

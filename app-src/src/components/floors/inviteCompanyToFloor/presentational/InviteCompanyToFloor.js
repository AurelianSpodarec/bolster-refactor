import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import InviteCompanyToFloorFormContainer from '../containers/InviteCompanyToFloorFormContainer';

const InviteCompanyToFloor = () => (
    <div className="size-lg-12">
        <Breadcrumb />
        <InviteCompanyToFloorFormContainer />
    </div>
);

export default InviteCompanyToFloor;

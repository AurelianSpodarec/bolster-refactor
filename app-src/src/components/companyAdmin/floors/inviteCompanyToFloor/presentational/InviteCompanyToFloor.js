import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import InviteCompanyFormContainer from 'components/shared/companies/containers/InviteCompanyFormContainer';

const InviteCompanyToFloor = () => (
    <div className="size-lg-12">
        <Breadcrumb />
        <InviteCompanyFormContainer hierarchyType="floor" />
    </div>
);

export default InviteCompanyToFloor;

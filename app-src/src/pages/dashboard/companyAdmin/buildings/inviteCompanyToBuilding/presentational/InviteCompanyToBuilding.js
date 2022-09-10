import React from 'react';

import InviteCompanyFormContainer from 'components_DEPRECATED/shared/companies/containers/InviteCompanyFormContainer';
import PageHeading from 'components_DEPRECATED/shared/generic/pageHeading/presentational/PageHeading';

const InviteCompanyToBuilding = () => (
    <div className="size-lg-12">
        <PageHeading leftChildren={true} title="Invite Company" withBackButton />
        <InviteCompanyFormContainer hierarchyType="building" />
    </div>
);

export default InviteCompanyToBuilding;

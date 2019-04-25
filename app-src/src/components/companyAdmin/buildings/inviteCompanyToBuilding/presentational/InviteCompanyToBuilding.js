import React from 'react';

import InviteCompanyFormContainer from 'components/shared/companies/containers/InviteCompanyFormContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const InviteCompanyToBuilding = () => (
    <div className="size-lg-12">
        <PageHeading
            leftChildren={true}
            title="Invite Company"
            withBackButton
        />
        <InviteCompanyFormContainer hierarchyType="building" />
    </div>
);

export default InviteCompanyToBuilding;

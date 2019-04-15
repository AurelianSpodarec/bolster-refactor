import React from 'react';

import InviteCompanyFormContainer from 'components/shared/companies/containers/InviteCompanyFormContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';

const InviteCompanyToBuilding = () => (
    <div className="size-lg-12">
        <PageHeading leftChildren={true} title="Invite Company">
            <BackButtonContainer />
        </PageHeading>
        <InviteCompanyFormContainer hierarchyType="building" />
    </div>
);

export default InviteCompanyToBuilding;

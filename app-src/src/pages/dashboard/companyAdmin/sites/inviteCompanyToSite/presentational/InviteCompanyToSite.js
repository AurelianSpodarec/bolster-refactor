import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import InviteCompanyFormContainer from 'components/shared/companies/containers/InviteCompanyFormContainer';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';

const InviteCompanyToSite = () => (
    <div className="size-lg-12">
        <PageHeading leftChildren={true} title="Invite Company">
            <BackButtonContainer />
        </PageHeading>
        <InviteCompanyFormContainer hierarchyType="site" />
    </div>
);

export default InviteCompanyToSite;

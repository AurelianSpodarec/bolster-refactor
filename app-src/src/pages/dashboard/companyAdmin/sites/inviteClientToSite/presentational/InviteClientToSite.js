import React from 'react';

import InviteClientFormContainer from 'components/shared/clients/containers/InviteClientFormContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';

const InviteClientToSite = ({ siteName }) => (
    <>
        <PageHeading leftChildren={true} title="Invite Client">
            <BackButtonContainer />
        </PageHeading>
        <InviteClientFormContainer siteName={siteName} hierarchyType="site" />
    </>
);

export default InviteClientToSite;

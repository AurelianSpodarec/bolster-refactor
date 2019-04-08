import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import InviteClientFormContainer from 'components/shared/clients/containers/InviteClientFormContainer';

const InviteClientToSite = ({ siteID, siteName }) => (
    <>
        <Breadcrumb
            breadcrumbs={[
                { text: `Site: ${siteName}`, link: `/company/sites/${siteID}` },
                { text: 'Invite Client to site' }
            ]}
        />
        <InviteClientFormContainer siteName={siteName} hierarchyType="site" />
    </>
);

export default InviteClientToSite;

import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import InviteClientFormContainer from 'components/shared/clients/containers/InviteClientFormContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const InviteClientToSite = ({ siteID, siteName }) => (
    <>
        <Breadcrumb
            breadcrumbs={[
                { text: `Site: ${siteName}`, link: `/company/sites/${siteID}` },
                { text: 'Invite Client to site' }
            ]}
        />
        <PageHeading title={`Invite Client to ${siteName}`} />
        <InviteClientFormContainer siteName={siteName} hierarchyType="site" />
    </>
);

export default InviteClientToSite;

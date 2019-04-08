import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import InviteCompanyFormContainer from 'components/shared/companies/containers/InviteCompanyFormContainer';

const InviteCompanyToSite = ({ siteName }) => (
    <div className="size-lg-12">
        <Breadcrumb breadcrumbs={[{ text: 'item 1' }, { text: 'item 2' }]} />
        <PageHeading title={`Invite Company to Site: ${siteName}`} />
        <InviteCompanyFormContainer hierarchyType="site" />
    </div>
);

export default InviteCompanyToSite;

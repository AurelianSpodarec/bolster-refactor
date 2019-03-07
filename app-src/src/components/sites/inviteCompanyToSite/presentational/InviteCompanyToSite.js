import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import InviteCompanyToSiteFormContainer from '../containers/InviteCompanyToSiteFormContainer';

const InviteCompanyToSite = () => (
    <div className="size-lg-12">
        <Breadcrumb />
        <InviteCompanyToSiteFormContainer />
    </div>
);

export default InviteCompanyToSite;

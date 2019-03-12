import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import InviteCompanyToSiteFormContainer from '../containers/InviteCompanyToSiteFormContainer';

const InviteCompanyToSite = () => (
    <div className="size-lg-12">
        <Breadcrumb breadcrumbs={[{ text: 'item 1' }, { text: 'item 2' }]} />
        <InviteCompanyToSiteFormContainer />
    </div>
);

export default InviteCompanyToSite;

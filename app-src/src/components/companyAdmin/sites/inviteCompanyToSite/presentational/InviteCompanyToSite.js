import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import InviteCompanyToSiteContainer from '../containers/InviteCompanyToSiteContainer';

const InviteCompanyToSite = () => (
    <div className="size-lg-12">
        <Breadcrumb breadcrumbs={[{ text: 'item 1' }, { text: 'item 2' }]} />
        <InviteCompanyToSiteContainer />
    </div>
);

export default InviteCompanyToSite;

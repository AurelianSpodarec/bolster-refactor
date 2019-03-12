import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import InviteClientToSiteFormContainer from '../containers/InviteClientToSiteFormContainer';

const InviteClientToSite = () => (
    <div>
        <Breadcrumb breadcrumbs={[{ text: 'item 1' }, { text: 'item 2' }]} />
        <InviteClientToSiteFormContainer />
    </div>
);

export default InviteClientToSite;

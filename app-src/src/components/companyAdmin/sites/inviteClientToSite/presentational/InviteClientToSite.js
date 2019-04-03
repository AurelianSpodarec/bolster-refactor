import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import InviteClientToSiteContainer from '../containers/InviteClientToSiteContainer';

const InviteClientToSite = () => (
    <>
        <Breadcrumb breadcrumbs={[{ text: 'item 1' }, { text: 'item 2' }]} />
        <InviteClientToSiteContainer />
    </>
);

export default InviteClientToSite;

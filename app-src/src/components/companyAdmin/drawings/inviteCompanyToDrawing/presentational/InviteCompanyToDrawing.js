import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import InviteCompanyFormContainer from 'components/shared/companies/containers/InviteCompanyFormContainer';

const InviteCompanyToDrawing = () => (
    <div className="size-lg-12">
        <Breadcrumb breadcrumbs={[{ text: 'item 1' }, { text: 'item 2' }]} />
        <InviteCompanyFormContainer hierarchyType="drawing" />
    </div>
);

export default InviteCompanyToDrawing;

import React from 'react';

import InviteCompanyFormContainer from 'components_DEPRECATED/shared/companies/containers/InviteCompanyFormContainer';
import PageHeading from 'components_DEPRECATED/shared/generic/pageHeading/presentational/PageHeading';

const InviteCompanyToDrawing = () => (
    <div className="size-lg-12">
        <PageHeading leftChildren={true} title="Invite Company" withBackButton />
        <InviteCompanyFormContainer hierarchyType="drawing" />
    </div>
);

export default InviteCompanyToDrawing;

import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import InviteCompanyFormContainer from 'components/shared/companies/containers/InviteCompanyFormContainer';

const InviteCompanyToSite = ({ title }) => (
    <div className="size-lg-12">
        <Breadcrumb breadcrumbs={[{ text: 'item 1' }, { text: 'item 2' }]} />
        <PageHeading title={`Invite Company to Site: ${title}`} />
        <BlockContainer>
            <InviteCompanyFormContainer hierarchyType="site" />
        </BlockContainer>
    </div>
);

export default InviteCompanyToSite;

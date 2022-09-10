import React from 'react';

import PageHeading from 'components_DEPRECATED/shared/generic/pageHeading/presentational/PageHeading';
import Breadcrumb from 'components_DEPRECATED/shared/generic/breadcrumb/presentational/Breadcrumb';

const SitePageHeader = ({ site }) => (
    <PageHeading
        title={`Site: ${site.name || ''} ${site.isArchived ? '(ARCHIVED)' : ''}`}
        withBackButton
    >
        <Breadcrumb breadcrumbs={[{ text: 'Sites', link: '/client/sites' }, { text: site.name }]} />
    </PageHeading>
);
export default SitePageHeader;

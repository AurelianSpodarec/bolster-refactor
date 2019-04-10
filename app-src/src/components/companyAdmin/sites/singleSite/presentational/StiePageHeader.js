import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';

const SitePageHeader = ({ site }) => (
    <PageHeading title={`Site: ${site.name || ''}`}>
        <Breadcrumb
            breadcrumbs={[
                { text: 'Sites', link: '/company/sites' },
                { text: site.name }
            ]}
        />
    </PageHeading>
);
export default SitePageHeader;

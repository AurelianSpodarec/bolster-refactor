import React from 'react';
import { Link } from 'react-router-dom';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';

const SitePageHeader = ({ site }) => (
    <div className="page-heading size-lg-12">
        <PageHeading title={`Site: ${site.name || ''}`} />
        <Breadcrumb
            breadcrumbs={[
                { text: 'Sites', link: '/company/sites' },
                { text: site.name }
            ]}
        />
    </div>
);
export default SitePageHeader;

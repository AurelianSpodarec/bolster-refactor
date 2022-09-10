import React from 'react';

import PageHeading from 'components_DEPRECATED/shared/generic/pageHeading/presentational/PageHeading';
import Breadcrumb from 'components_DEPRECATED/shared/generic/breadcrumb/presentational/Breadcrumb';
import TabsContainer from 'components_DEPRECATED/shared/generic/tabs/containers/TabsContainer';

const SitePageHeader = ({ site, children }) => (
    <PageHeading
        title={`Site: ${site.name || ''} ${site.isArchived ? '(ARCHIVED)' : ''}`}
        withBackButton
    >
        <TabsContainer classes="hierarchy-tabs" />
        <Breadcrumb
            breadcrumbs={[{ text: 'Sites', link: '/company/sites' }, { text: site.name }]}
        ></Breadcrumb>
        {children}
    </PageHeading>
);
export default SitePageHeader;

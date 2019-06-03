import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import TabsContainer from 'components/shared/generic/tabs/containers/TabsContainer';

const SitePageHeader = ({ site, children }) => (
    <PageHeading
        title={`Site: ${site.name || ''} ${
            site.isArchived ? '(ARCHIVED)' : ''
        }`}
        withBackButton
    >
        <Breadcrumb
            breadcrumbs={[
                { text: 'Sites', link: '/company/sites' },
                { text: site.name }
            ]}
        >
            <TabsContainer />
        </Breadcrumb>
        {children}
    </PageHeading>
);
export default SitePageHeader;

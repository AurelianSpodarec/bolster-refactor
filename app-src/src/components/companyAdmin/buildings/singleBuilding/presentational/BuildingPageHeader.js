import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const BuildingPageHeader = ({ building, children }) => (
    <PageHeading
        title={`Building: ${building.name} ${
            building.isArchived ? '(ARCHIVED)' : ''
        }`}
        withBackButton
    >
        {children}
    </PageHeading>
);

export default BuildingPageHeader;

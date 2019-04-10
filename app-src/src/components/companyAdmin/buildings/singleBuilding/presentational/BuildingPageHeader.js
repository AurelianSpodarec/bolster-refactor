import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const BuildingPageHeader = ({ building }) => (
    <PageHeading title={`Building: ${building.name}`} />
);

export default BuildingPageHeader;

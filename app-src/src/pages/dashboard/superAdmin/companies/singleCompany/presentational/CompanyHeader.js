import React from 'react';

import PageHeading from 'components_DEPRECATED/shared/generic/pageHeading/presentational/PageHeading';

const CompanyHeader = ({ company: { name = '' } }) => (
    <PageHeading title={`Company: ${name}`} withBackButton />
);

export default CompanyHeader;

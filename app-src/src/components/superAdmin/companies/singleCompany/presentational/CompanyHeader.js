import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const CompanyHeader = ({ company: { name = '' } }) => (
    <PageHeading title={`Company: ${name}`} />
);

export default CompanyHeader;

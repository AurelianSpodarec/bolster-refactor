import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const SingleFloorHeader = ({ floor, children }) => (
    <PageHeading title={`Floor: ${floor.name || ''}`}>{children}</PageHeading>
);

export default SingleFloorHeader;

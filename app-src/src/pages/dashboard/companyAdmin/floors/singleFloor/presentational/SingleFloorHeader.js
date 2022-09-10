import React from 'react';

import PageHeading from 'components_DEPRECATED/shared/generic/pageHeading/presentational/PageHeading';

const SingleFloorHeader = ({ floor, children }) => (
    <PageHeading
        title={`Floor: ${floor.name || ''} ${floor.isArchived ? '(ARCHIVED)' : ''}`}
        withBackButton
    >
        {children}
    </PageHeading>
);

export default SingleFloorHeader;

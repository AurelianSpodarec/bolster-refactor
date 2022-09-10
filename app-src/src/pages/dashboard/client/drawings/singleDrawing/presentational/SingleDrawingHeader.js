import React from 'react';

import PageHeading from 'components_DEPRECATED/shared/generic/pageHeading/presentational/PageHeading';

const SingleDrawingHeader = ({ drawing, children }) => (
    <PageHeading
        title={`Drawing: ${drawing.name || ''} ${drawing.isArchived ? '(ARCHIVED)' : ''}`}
        withBackButton
    >
        {children}
    </PageHeading>
);

export default SingleDrawingHeader;

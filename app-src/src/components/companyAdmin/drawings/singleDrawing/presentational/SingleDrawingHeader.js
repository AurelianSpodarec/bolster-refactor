import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const SingleDrawingHeader = ({ drawing, children }) => (
    <PageHeading title={`Drawing: ${drawing.name || ''}`}>
        {children}
    </PageHeading>
);

export default SingleDrawingHeader;

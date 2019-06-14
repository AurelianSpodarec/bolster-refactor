import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import PinSingleBreadCrumbContainer from '../containers/PinSingleBreadCrumbContainer';

const SinglePinHeader = ({ pin }) => (
    <PageHeading
        withBackButton
        backURL={`/company/drawings/${pin.drawingID}`}
        title={`Pin ${pin.pinCode || ''}`}
    >
        <PinSingleBreadCrumbContainer pin={pin} />
    </PageHeading>
);

export default SinglePinHeader;

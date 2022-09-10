import React from 'react';

import PageHeading from 'components_DEPRECATED/shared/generic/pageHeading/presentational/PageHeading';
import PinSingleBreadCrumbContainer from '../containers/PinSingleBreadCrumbContainer';

const SinglePinHeader = ({ pin }) => (
    <PageHeading withBackButton title={`Pin ${pin.pinCode || ''}`}>
        <PinSingleBreadCrumbContainer pin={pin} />
    </PageHeading>
);

export default SinglePinHeader;

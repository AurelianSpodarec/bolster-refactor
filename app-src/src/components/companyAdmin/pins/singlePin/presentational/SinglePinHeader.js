import React from 'react';
import { Link } from 'react-router-dom';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const SinglePinHeader = ({ pin, location }) => (
    <PageHeading leftChildren={true} title={`Pin ${pin.pinCode || ''}`}>
        <Link
            to={location.pathname.replace(
                location.pathname,
                `/company/drawings/${pin.drawingID}`
            )}
            className="button back"
        >
            <i className="fa fa-chevron-double-left" /> Back
        </Link>
    </PageHeading>
);

export default SinglePinHeader;

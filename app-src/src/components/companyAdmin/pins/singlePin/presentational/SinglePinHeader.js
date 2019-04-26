import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import ButtonNoClickContainer from 'components/shared/generic/button/containers/ButtonNoClickContainer';

const SinglePinHeader = ({ pin, location }) => (
    <PageHeading leftChildren={true} title={`Pin ${pin.pinCode || ''}`}>
        <ButtonNoClickContainer
            className="back"
            to={location.pathname.replace(
                location.pathname,
                `/company/drawings/${pin.drawingID}`
            )}
        >
            <i className="fa fa-chevron-double-left" /> Back
        </ButtonNoClickContainer>
    </PageHeading>
);

export default SinglePinHeader;

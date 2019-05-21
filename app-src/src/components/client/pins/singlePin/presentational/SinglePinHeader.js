import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const SinglePinHeader = ({ pin, location }) => (
    <PageHeading leftChildren={true} title={`Pin ${pin.pinCode || ''}`}>
        <ButtonContainer
            className="back"
            to={location.pathname.replace(
                location.pathname,
                `/client/drawings/${pin.drawingID}`
            )}
        >
            <i className="fa fa-chevron-double-left" /> Back
        </ButtonContainer>
    </PageHeading>
);

export default SinglePinHeader;

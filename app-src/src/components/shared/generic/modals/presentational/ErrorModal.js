import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import PageHeading from '../../pageHeading/presentational/PageHeading';
import BlockHeading from '../../blockHeading/presentational/BlockHeading';

const ErrorModal = ({
    message = 'An error occurred while processing your request, please try again later',
    title = 'Error'
}) => (
    <ModalOuterContainer>
        <BlockHeading title={title} />
        <p className="generic-text intro-text size-lg-12">{message}</p>
    </ModalOuterContainer>
);

export default ErrorModal;

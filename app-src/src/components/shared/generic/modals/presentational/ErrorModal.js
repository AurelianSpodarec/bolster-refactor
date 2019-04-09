import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import PageHeading from '../../pageHeading/presentational/PageHeading';

const ErrorModal = ({
    message = 'An error occurred while processing your request, please try again later',
    title = 'Error'
}) => (
    <ModalOuterContainer>
        <PageHeading title={title} />
        <p>{message}</p>
    </ModalOuterContainer>
);

export default ErrorModal;

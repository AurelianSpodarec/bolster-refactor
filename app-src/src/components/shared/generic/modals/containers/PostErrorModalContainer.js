import React from 'react';
import DeletionErrorModal from '../presentational/ErrorModal';

const ErrorModal = ({
    message = 'An error occurred while processing your request, please try again later',
    title = 'Error'
}) => <DeletionErrorModal message={message} title={title} />;

export default ErrorModal;

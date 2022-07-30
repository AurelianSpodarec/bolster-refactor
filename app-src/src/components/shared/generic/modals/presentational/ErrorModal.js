import React from 'react';

import FlexModalOuter from './FlexModalOuter';
import ButtonWrapper from '../../button/presentational/ButtonWrapper';
import ActionButton from '../../button/presentational/ActionButton';

const ErrorModal = ({
    title = 'Error',
    message = 'An error occurred while processing your request, please try again later',
    hideModal,
}) => (
    <FlexModalOuter title={title}>
        <div className="flex-content-wrapper">
            <div className="flex-content">
                <p className="generic-text size-lg-12">{message}</p>
            </div>
        </div>

        <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
            <ActionButton text="Close" size="small" onClick={hideModal} />
        </ButtonWrapper>
    </FlexModalOuter>
);

export default ErrorModal;

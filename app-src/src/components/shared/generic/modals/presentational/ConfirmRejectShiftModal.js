import React from 'react';

import Error from '../../misc/presentational/Error';
import ButtonWrapper from '../../button/presentational/ButtonWrapper';
import ActionButton from '../../button/presentational/ActionButton';
import FlexModalOuter from './FlexModalOuter';

const ConfirmRejectShiftModal = ({
    handleReject,
    hideModal,
    title = 'Confirmation',
    message = 'Are you sure you want to submit this?',
    submitButtonText = 'Confirm',
    submitButtonIcon = 'check',
    error = null,
    submitAmbient,
}) => {
    return (
        <FlexModalOuter title={title}>
            <div className="flex-content-wrapper">
                <div className="flex-content">
                    <p className="generic-text size-lg-12">{message}</p>
                    {error && <Error>{error}</Error>}
                </div>
            </div>

            <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
                <ActionButton text="Cancel" onClick={hideModal} size="small" source="secondary" />
                <ActionButton
                    text={submitButtonText}
                    icon={submitButtonIcon}
                    onClick={handleReject}
                    size="small"
                    ambient={submitAmbient}
                />
            </ButtonWrapper>
        </FlexModalOuter>
    );
};

export default ConfirmRejectShiftModal;

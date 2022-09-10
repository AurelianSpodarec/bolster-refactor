import React from 'react';

import ButtonWrapper from 'components_DEPRECATED/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components_DEPRECATED/shared/generic/button/presentational/ActionButton';
import FlexModalOuter from 'components_DEPRECATED/shared/generic/modals/presentational/FlexModalOuter';

const ConfirmEditPinModal = ({
    handleEditPin,
    hideModal,
    message = 'Are you sure you want to edit this pin?',
}) => (
    <FlexModalOuter title="Confirm Edit Pin">
        <div className="flex-content-wrapper">
            <div className="flex-content">
                <p className="generic-text size-lg-12">{message}</p>
            </div>

            <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
                <ActionButton text="Cancel" onClick={hideModal} source="secondary" size="small" />
                <ActionButton text="Confirm" onClick={handleEditPin} icon="check" size="small" />
            </ButtonWrapper>
        </div>
    </FlexModalOuter>
);

export default ConfirmEditPinModal;

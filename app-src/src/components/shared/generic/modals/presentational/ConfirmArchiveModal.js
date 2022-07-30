import React from 'react';

import ActionButton from '../../button/presentational/ActionButton';
import FlexModalOuter from './FlexModalOuter';
import ButtonWrapper from '../../button/presentational/ButtonWrapper';

const ConfirmArchiveModal = ({
    handleArchive,
    hideModal,
    message = 'Are you sure you want to archive this?',
}) => (
    <FlexModalOuter title="Archive Confirmation">
        <div className="flex-content-wrapper">
            <div className="flex-content">
                <p className="generic-text size-lg-12">{message}</p>
            </div>
        </div>

        <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
            <ActionButton source="secondary" text="Cancel" onClick={hideModal} />
            <ActionButton type="submit" text="Confirm" icon="check" onClick={handleArchive} />
        </ButtonWrapper>
    </FlexModalOuter>
);

export default ConfirmArchiveModal;

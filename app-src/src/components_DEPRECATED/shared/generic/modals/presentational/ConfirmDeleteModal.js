import React from 'react';

import Error from '../../misc/presentational/Error';
import ButtonWrapper from '../../button/presentational/ButtonWrapper';
import ActionButton from '../../button/presentational/ActionButton';
import FlexModalOuter from './FlexModalOuter';

const ConfirmDeleteModal = ({
    handleDelete,
    hideModal,
    handleCancel = hideModal,
    title = 'Delete?',
    message = 'Are you sure you want to delete this?',
    deleteButtonText = 'Delete',
    deleteButtonIcon = 'trash-alt',
    error = null,
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
                <ActionButton
                    text="Cancel"
                    size="small"
                    source="secondary"
                    onClick={handleCancel}
                />
                <ActionButton
                    text={deleteButtonText}
                    onClick={handleDelete}
                    icon={deleteButtonIcon}
                />
            </ButtonWrapper>
        </FlexModalOuter>
    );
};

export default ConfirmDeleteModal;

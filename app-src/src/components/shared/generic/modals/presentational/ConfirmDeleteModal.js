import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Error from '../../misc/presentational/Error';
import ButtonWrapper from '../../button/presentational/ButtonWrapper';
import ActionButton from '../../button/presentational/ActionButton';

const ConfirmDeleteModal = ({
    handleDelete,
    hideModal,
    handleCancel = hideModal,
    message = 'Are you sure you want to delete this?',
    isIncoming = false,
    deleteButtonText = 'Delete',
    icon = 'trash-alt',
    isPosting = false,
    error = null,
}) => {
    return (
        <ModalOuterContainer>
            <BlockHeading title={'Confirmation'} />
            <p className="generic-text intro-text size-lg-12">{message}</p>
            {error && <Error>{error}</Error>}
            <BlockButtonWrapper>
                <ButtonWrapper alignment="right">
                    <ActionButton
                        text="Cancel"
                        size="small"
                        source="secondary"
                        onClick={handleCancel}
                    />
                    <ActionButton
                        text={isIncoming ? 'Decline' : deleteButtonText}
                        size="small"
                        icon={isIncoming ? 'ban' : icon}
                        onClick={handleDelete}
                        disabled={isPosting}
                    />
                </ButtonWrapper>
            </BlockButtonWrapper>
        </ModalOuterContainer>
    );
};

export default ConfirmDeleteModal;

import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Error from '../../misc/presentational/Error';
import ButtonWrapper from '../../button/presentational/ButtonWrapper';
import ActionButton from '../../button/presentational/ActionButton';

const ConfirmSubmitModal = ({
    handleSubmit,
    hideModal,
    title = 'Submit Confirmation',
    message = 'Are you sure you want to submit this?',
    submitButtonText = 'Submit',
    submitButtonIcon = 'save',
    error = null,
}) => (
    <ModalOuterContainer>
        <BlockHeading title={title} />
        <p className="generic-text intro-text size-lg-12">{message}</p>
        {error && <Error>{error}</Error>}
        <BlockButtonWrapper>
            <ButtonWrapper alignment="right">
                <ActionButton text="Cancel" onClick={hideModal} size="small" source="secondary" />
                <ActionButton
                    text={submitButtonText}
                    icon={submitButtonIcon}
                    onClick={handleSubmit}
                    size="small"
                />
            </ButtonWrapper>
        </BlockButtonWrapper>
    </ModalOuterContainer>
);

export default ConfirmSubmitModal;

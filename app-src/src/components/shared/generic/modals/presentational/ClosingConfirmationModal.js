import React from 'react';
import { useDispatch } from 'react-redux';

import hideModal from 'actions/shared/generic/modals/sync/hideModal';

import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import ButtonWrapper from '../../button/presentational/ButtonWrapper';

const ClosingConfirmationModal = ({
    title = 'Leave?',
    description = 'Changes will not be saved.',
    primaryButtonText = 'Confirm',
    secondaryButtonText = 'Cancel',
    primaryButtonType = 'button',
    secondaryButtonType = 'button',
    handlePrimaryButton,
    handleSecondaryButton,
}) => {
    const dispatch = useDispatch();

    const closeModal = () => {
        dispatch(hideModal());
    };

    const handlePrimaryButtonClick = () => {
        if (handlePrimaryButton) {
            handlePrimaryButton();
        } else {
            closeModal();
        }
    };

    const handleSecondaryButtonClick = () => {
        if (handleSecondaryButton) {
            handleSecondaryButton();
        } else {
            closeModal();
        }
    };
    return (
        <div className="closing-confirm-modal-container size-lg-12">
            <div className="bg" />

            <div className="modal-block closing-confirm-modal-block">
                <BlockContainer contentClass="closing-confirm-content-container">
                    <BlockContainer contentClass="flex-column">
                        <FlexWrapper className="block-heading" justify="between" align="center">
                            <h3 className="heading heading-3 flex">{title}</h3>
                        </FlexWrapper>

                        <p className="generic-text">{description}</p>

                        <ButtonWrapper alignment="right" extraClasses="modal-buttons">
                            <ActionButton
                                text={secondaryButtonText}
                                source="secondary"
                                size="medium"
                                type={secondaryButtonType}
                                onClick={handleSecondaryButtonClick}
                            />
                            <ActionButton
                                text={primaryButtonText}
                                size="medium"
                                onClick={handlePrimaryButtonClick}
                                type={primaryButtonType}
                            />
                        </ButtonWrapper>
                    </BlockContainer>
                </BlockContainer>
            </div>
        </div>
    );
};

export default ClosingConfirmationModal;

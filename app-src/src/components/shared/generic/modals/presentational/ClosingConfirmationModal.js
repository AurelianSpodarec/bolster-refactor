import React from 'react';
import { useDispatch } from 'react-redux';

import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';

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
        <div className="just-to-check-modal-container size-lg-12">
            <div className="just-to-check-bg" />

            <div className="modal-block just-to-check-modal-block">
                <BlockContainer contentClass="just-to-check-content-container">
                    <BlockContainer contentClass="flex-column">
                        <FlexWrapper className="block-heading" justify="between" align="center">
                            <h3 className="heading heading-3 flex">{title}</h3>
                        </FlexWrapper>

                        <p className="generic-text">{description}</p>

                        <BlockButtonWrapper additionalClasses="just-to-check-modal-buttons">
                            <ActionButton
                                text={primaryButtonText}
                                size="medium"
                                onClick={handlePrimaryButtonClick}
                                type={primaryButtonType}
                            />
                            <ActionButton
                                text={secondaryButtonText}
                                source="secondary"
                                size="medium"
                                type={secondaryButtonType}
                                onClick={handleSecondaryButtonClick}
                            />
                        </BlockButtonWrapper>
                    </BlockContainer>
                </BlockContainer>
            </div>
        </div>
    );
};

export default ClosingConfirmationModal;

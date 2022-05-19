import React from 'react';
import { useDispatch } from 'react-redux';

import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';

const ClosingConfirmationModal = ({
    showClosingConfirmationModal,
    setShowClosingConfirmationModal,
}) => {
    const dispatch = useDispatch();
    return showClosingConfirmationModal ? (
        <div className="just-to-check-modal-container size-lg-12">
            <div className="just-to-check-bg" />

            <div className="modal-block just-to-check-modal-block">
                <BlockContainer contentClass="just-to-check-content-container">
                    <BlockContainer contentClass="flex-column">
                        <FlexWrapper className="block-heading" justify="between" align="center">
                            <h3 className="heading heading-3 flex">Leave installation type?</h3>
                        </FlexWrapper>

                        <p className="generic-text">Changes will not be saved</p>

                        <BlockButtonWrapper additionalClasses="just-to-check-modal-buttons">
                            <ActionButton
                                text="Stay and edit"
                                size="medium"
                                onClick={() => setShowClosingConfirmationModal(false)}
                            />
                            <ActionButton
                                source="secondary"
                                text="Leave"
                                size="medium"
                                onClick={() => dispatch(hideModal())}
                            />
                        </BlockButtonWrapper>
                    </BlockContainer>
                </BlockContainer>
            </div>
        </div>
    ) : null;
};

export default ClosingConfirmationModal;

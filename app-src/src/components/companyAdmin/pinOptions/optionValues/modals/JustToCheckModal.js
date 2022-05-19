import React from 'react';
import { useDispatch } from 'react-redux';

import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';

const JustToCheckModal = ({
    title = 'Overwrite prices?',
    text = 'Saving will overwrite previous pricing',
    showJustToCheckModal,
    setShowJustToCheckModal,
    backButtonText = 'Go Back',
    stayButtonText = 'Overwrite',
}) => {
    const dispatch = useDispatch();
    return (
        showJustToCheckModal && (
            <div className="just-to-check-modal-container size-lg-12">
                <div className="just-to-check-bg" />

                <div className="modal-block just-to-check-modal-block">
                    <BlockContainer contentClass="just-to-check-content-container">
                        <BlockContainer contentClass="flex-column">
                            <FlexWrapper className="block-heading" justify="between" align="center">
                                <h3 className="heading heading-3 flex">{title}</h3>
                            </FlexWrapper>

                            <p className="generic-text">{text}</p>

                            <BlockButtonWrapper additionalClasses="just-to-check-modal-buttons">
                                {/* ####### change on click action ######## */}
                                <ActionButton
                                    text={stayButtonText}
                                    size="medium"
                                    onClick={() => setShowJustToCheckModal(false)}
                                />
                                <ActionButton
                                    source="secondary"
                                    text={backButtonText}
                                    size="medium"
                                    onClick={
                                        backButtonText === 'Leave'
                                            ? () => dispatch(hideModal())
                                            : setShowJustToCheckModal(false)
                                    }
                                />
                            </BlockButtonWrapper>
                        </BlockContainer>
                    </BlockContainer>
                </div>
            </div>
        )
    );
};

export default JustToCheckModal;

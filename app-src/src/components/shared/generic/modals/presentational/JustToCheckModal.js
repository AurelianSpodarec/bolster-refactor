import React from 'react';

import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';

const JustToCheckModal = ({ showJustToCheckModal, setShowJustToCheckModal }) => {
    return (
        showJustToCheckModal && (
            <div className="just-to-check-modal-container size-lg-12">
                <div className="just-to-check-bg" />

                <div className="modal-block just-to-check-modal-block">
                    <BlockContainer contentClass="just-to-check-content-container">
                        <BlockContainer contentClass="flex-column">
                            <FlexWrapper className="block-heading" justify="between" align="center">
                                <h3 className="heading heading-3 flex">Overwrite prices?</h3>
                            </FlexWrapper>

                            <p className="generic-text">Saving will overwrite previous pricing</p>

                            <BlockButtonWrapper additionalClasses="just-to-check-modal-buttons">
                                {/* ####### change on click action ######## */}
                                <ActionButton
                                    text="Overwrite"
                                    size="medium"
                                    onClick={() => setShowJustToCheckModal(false)}
                                />
                                <ActionButton
                                    source="secondary"
                                    text="Go Back"
                                    size="medium"
                                    onClick={() => setShowJustToCheckModal(false)}
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

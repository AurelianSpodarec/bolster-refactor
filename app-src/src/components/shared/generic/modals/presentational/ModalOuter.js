import React from 'react';
import BlockContainer from '../../block/containers/BlockContainer';
import FlexWrapper from '../../flexWrapper/FlexWrapper';

const ModalOuter = ({ children, handleClose, extraClasses = '', hideCloseButton }) => (
    <div className="modal-container size-lg-12">
        <div className="bg" />

        <div className={`modal-block ${extraClasses}`}>
            <FlexWrapper justify="between">
                {!hideCloseButton && (
                    <button className="close" onClick={handleClose}>
                        <i className="fa fa-times" />
                    </button>
                )}
            </FlexWrapper>

            <BlockContainer>{children}</BlockContainer>
        </div>
    </div>
);

export default ModalOuter;

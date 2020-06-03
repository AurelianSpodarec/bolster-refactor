import React from 'react';
import BlockContainer from '../../block/containers/BlockContainer';

const ModalOuter = ({ children, handleClose, extraClasses = '', hideCloseButton }) => (
    <div className="modal-container size-lg-12">
        <div className="bg" />

        <div className={`modal-block ${extraClasses}`}>
            {!hideCloseButton && <button className="close" onClick={handleClose}>
                <i className="fa fa-times" />
            </button>}

            <BlockContainer>{children}</BlockContainer>
        </div>
    </div>
);

export default ModalOuter;

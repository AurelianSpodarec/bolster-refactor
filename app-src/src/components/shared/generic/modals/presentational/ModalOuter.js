import React from 'react';
import BlockContainer from '../../block/containers/BlockContainer';

const ModalOuter = ({ children, hideModal, extraClasses = '' }) => (
    <div className="modal-container size-lg-12">
        <div className="bg" />

        <div className={`modal-block ${extraClasses}`}>
            <button className="close" onClick={hideModal}>
                <i className="fa fa-times" />
            </button>
            <BlockContainer>{children}</BlockContainer>
        </div>
    </div>
);

export default ModalOuter;

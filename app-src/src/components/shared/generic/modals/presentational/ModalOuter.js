import React from 'react';

import { useDispatch } from 'react-redux';

import hideModal from 'actions/shared/generic/modals/sync/hideModal';

import BlockContainer from '../../block/containers/BlockContainer';
import FlexWrapper from '../../flexWrapper/FlexWrapper';

const ModalOuter = ({ children, handleClose, extraClasses = '', hideCloseButton }) => {
    const dispatch = useDispatch();

    const _handleClose = () => {
        if (handleClose) {
            handleClose();
        } else {
            dispatch(hideModal());
        }
    };

    return (
        <div className="modal-container size-lg-12">
            <div className="bg" />

            <div id="modal-block" className={`modal-block ${extraClasses}`}>
                <FlexWrapper justify="between">
                    {!hideCloseButton && (
                        <button className="close" onClick={_handleClose}>
                            <i className="fa fa-times" />
                        </button>
                    )}
                </FlexWrapper>

                <BlockContainer>{children}</BlockContainer>
            </div>
        </div>
    );
};

export default ModalOuter;

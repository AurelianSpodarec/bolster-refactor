import React from 'react';
import { useDispatch } from 'react-redux';

import hideModal from 'actions/shared/generic/modals/sync/hideModal';

import FlexWrapper from '../../flexWrapper/FlexWrapper';

const ModalHeading = ({
    children,
    title = '',
    blockClasses = '',
    headerClasses = '',
    hideCloseButton,
    handleClose,
}) => {
    const dispatch = useDispatch();

    const _handleClose = () => {
        if (handleClose) {
            handleClose();
        } else {
            dispatch(hideModal());
        }
    };

    return (
        <FlexWrapper
            extraClasses={`block-heading ${blockClasses}`}
            justify="between"
            align="center"
        >
            <h3 className={`heading heading-3 ${headerClasses} flex`}>{title}</h3>

            <FlexWrapper autoWidth align="center">
                {children}

                {!hideCloseButton && (
                    <button className="close" onClick={_handleClose}>
                        <i className="fa fa-times" />
                    </button>
                )}
            </FlexWrapper>
        </FlexWrapper>
    );
};

export default ModalHeading;

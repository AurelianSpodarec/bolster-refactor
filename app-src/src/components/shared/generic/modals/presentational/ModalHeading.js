import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import FlexWrapper from '../../flexWrapper/FlexWrapper';
import ClosingConfirmationModal from '../../../../shared/generic/modals/presentational/ClosingConfirmationModal';

const ModalHeading = ({
    children,
    title = '',
    blockClasses = '',
    headerClasses = '',
    hideCloseButton,
    showClosingConfirmationModal,
    setShowClosingConfirmationModal,
    closingConfirmation = false,
}) => {
    const dispatch = useDispatch();
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
                    <button
                        className="close"
                        onClick={() =>
                            closingConfirmation
                                ? setShowClosingConfirmationModal(true)
                                : dispatch(hideModal())
                        }
                    >
                        <i className="fa fa-times" />
                    </button>
                )}
            </FlexWrapper>
            {showClosingConfirmationModal && (
                <ClosingConfirmationModal
                    showClosingConfirmationModal={showClosingConfirmationModal}
                    setShowClosingConfirmationModal={setShowClosingConfirmationModal}
                />
            )}
        </FlexWrapper>
    );
};

export default ModalHeading;

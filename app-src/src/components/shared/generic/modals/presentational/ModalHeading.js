import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import hideModal from 'actions/shared/generic/modals/sync/hideModal';

import FlexWrapper from '../../flexWrapper/FlexWrapper';
import JustToCheckModal from 'components/companyAdmin/pinOptions/optionValues/modals/JustToCheckModal';

const ModalHeading = ({
    children,
    title = '',
    blockClasses = '',
    headerClasses = '',
    hideCloseButton,
    closingConfirmation = false,
    backButtonText,
    stayButtonText,
    backModalTitle,
    backModalText,
}) => {
    const dispatch = useDispatch();
    const [showClosingConfirmationModal, setClosingConfirmationModal] = useState(false);

    console.log(backModalTitle);

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
                                ? setClosingConfirmationModal(true)
                                : dispatch(hideModal())
                        }
                    >
                        <i className="fa fa-times" />
                    </button>
                )}
            </FlexWrapper>
            {showClosingConfirmationModal && (
                <JustToCheckModal
                    title={backModalTitle}
                    text={backModalText}
                    showJustToCheckModal={showClosingConfirmationModal}
                    setShowJustToCheckModal={setClosingConfirmationModal}
                    backButtonText={backButtonText}
                    stayButtonText={stayButtonText}
                />
            )}
        </FlexWrapper>
    );
};

export default ModalHeading;

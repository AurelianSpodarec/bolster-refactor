import React from 'react';

import ModalHeading from './ModalHeading';

const FlexModalOuter = ({
    children,
    headingChildren,
    title = '',
    extraClasses = '',
    closingConfirmation,
    showJustToCheckModal,
    setShowJustToCheckModal,
    backButtonText,
    stayButtonText,
    backModalTitle,
    backModalText,
}) => (
    <div className="flex-modal-container size-lg-12">
        <div className="bg" />

        <div id="modal-block" className={`modal-block ${extraClasses}`}>
            <ModalHeading
                title={title}
                blockClasses="flex-modal-header"
                closingConfirmation={closingConfirmation}
                showJustToCheckModal={showJustToCheckModal}
                setShowJustToCheckModal={setShowJustToCheckModal}
                backButtonText={backButtonText}
                stayButtonText={stayButtonText}
                backModalTitle={backModalTitle}
                backModalText={backModalText}
            >
                {headingChildren}
            </ModalHeading>
            {children}
        </div>
    </div>
);

export default FlexModalOuter;

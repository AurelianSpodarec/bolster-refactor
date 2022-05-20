import React from 'react';

import ModalHeading from './ModalHeading';

const FlexModalOuter = ({
    children,
    headingChildren,
    title = '',
    extraClasses = '',
    showClosingConfirmationModal,
    setShowClosingConfirmationModal,
    closingConfirmation,
}) => (
    <div className="flex-modal-container size-lg-12">
        <div className="bg" />

        <div id="modal-block" className={`modal-block ${extraClasses}`}>
            <ModalHeading
                title={title}
                blockClasses="flex-modal-header"
                showClosingConfirmationModal={showClosingConfirmationModal}
                setShowClosingConfirmationModal={setShowClosingConfirmationModal}
                closingConfirmation={closingConfirmation}
            >
                {headingChildren}
            </ModalHeading>
            {children}
        </div>
    </div>
);

export default FlexModalOuter;

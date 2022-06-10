import React from 'react';

import ModalHeading from './ModalHeading';

const FlexModalOuter = ({
    children,
    headingChildren,
    title = '',
    extraClasses = '',
    handleClose,
    hideHeading = false,
}) => (
    <div className="flex-modal-container size-lg-12">
        <div className="bg" />

        <div id="modal-block" className={`modal-block ${extraClasses}`}>
            {!hideHeading && (
                <ModalHeading
                    title={title}
                    blockClasses="flex-modal-header"
                    handleClose={handleClose}
                >
                    {headingChildren}
                </ModalHeading>
            )}

            {children}
        </div>
    </div>
);

export default FlexModalOuter;

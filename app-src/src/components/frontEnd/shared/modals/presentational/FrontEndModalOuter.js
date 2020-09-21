import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PlusIcon from '_content/images/frontend-new/why-use-our-system/plus-icon.png';

const FrontEndModalOuter = ({ children, handleClose, extraClasses = '', hideCloseButton }) => (
    <div className="frontend-modal-container size-lg-12">
        <div className="bg" />

        <div className={`frontend-modal-block ${extraClasses}`}>
            {!hideCloseButton && <img src={PlusIcon} className="close" onClick={handleClose} />}
            <BlockContainer>{children}</BlockContainer>
        </div>
    </div>
);

export default FrontEndModalOuter;

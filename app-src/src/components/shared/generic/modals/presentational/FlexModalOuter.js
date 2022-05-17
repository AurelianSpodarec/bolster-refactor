import React from 'react';

import BlockContainer from '../../block/containers/BlockContainer';
import ModalHeading from './ModalHeading';

const FlexModalOuter = ({ children, headingChildren, title = '', extraClasses = '' }) => (
    <div className="modal-container size-lg-12">
        <div className="bg" />

        <div id="modal-block" className={`modal-block ${extraClasses}`}>
            <BlockContainer>
                <ModalHeading title={title}>{headingChildren}</ModalHeading>
                {children}
            </BlockContainer>
        </div>
    </div>
);

export default FlexModalOuter;

import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const CreatePrelimModal = () => {
    return (
        <ModalOuterContainer>
            <BlockHeading title={`Add `} />
        </ModalOuterContainer>
    );
};

export default CreatePrelimModal;

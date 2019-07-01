import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import SOSGenerationFormContainer from '../containers/SOSGenerationFormContainer';

const SOSGenerationModal = () => (
    <ModalOuterContainer>
        <BlockHeading title="Generate SOS Code" />
        <SOSGenerationFormContainer />
    </ModalOuterContainer>
);

export default SOSGenerationModal;

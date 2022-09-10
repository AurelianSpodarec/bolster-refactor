import React from 'react';

import ModalOuterContainer from 'components_DEPRECATED/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components_DEPRECATED/shared/generic/blockHeading/presentational/BlockHeading';
import AddNewFeatureFormContainer from '../containers/AddNewFeatureFormContainer';

const AddNewFeatureModal = () => (
    <ModalOuterContainer>
        <BlockHeading title="Add a New Feature" />
        <AddNewFeatureFormContainer />
    </ModalOuterContainer>
);

export default AddNewFeatureModal;

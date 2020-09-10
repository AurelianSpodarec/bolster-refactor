import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import EditNewFeatureContainer from '../container/EditNewFeatureContainer';

const EditNewFeatureModal = ({ newFeature }) => {
    console.log(newFeature);
    return (
        <ModalOuterContainer>
            <BlockHeading title="Edit Feature" />
            <EditNewFeatureContainer />
        </ModalOuterContainer>
    );
};

export default EditNewFeatureModal;

import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import EditFeatureFormContainer from '../container/EditFeatureFormContainer';

const EditNewFeatureModal = ({ feature, hideModal }) => {
    return (
        <ModalOuterContainer>
            <BlockHeading title="Edit Feature" />
            <EditFeatureFormContainer feature={feature} hideModal={hideModal} />
        </ModalOuterContainer>
    );
};

export default EditNewFeatureModal;

import React from 'react';
import ModalOuterContainer from 'components_DEPRECATED/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components_DEPRECATED/shared/generic/blockHeading/presentational/BlockHeading';
import CreateOperativeFormContainer from '../containers/CreateOperativeFormContainer';

const CreateOperativeModal = () => (
    <ModalOuterContainer>
        <BlockHeading title={'Create Operative'} />
        <CreateOperativeFormContainer />
    </ModalOuterContainer>
);

export default CreateOperativeModal;

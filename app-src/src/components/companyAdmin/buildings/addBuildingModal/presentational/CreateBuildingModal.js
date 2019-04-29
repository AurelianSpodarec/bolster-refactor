import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import CreateBuildingFormContainer from '../containers/CreateBuildingFormContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const CreateBuildingModal = () => (
    <ModalOuterContainer>
        <BlockHeading title={'Create Building'} />
        <CreateBuildingFormContainer />
    </ModalOuterContainer>
);

export default CreateBuildingModal;

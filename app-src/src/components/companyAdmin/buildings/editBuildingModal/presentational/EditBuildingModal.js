import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import EditBuildingFormContainer from '../containers/EditBuildingFormContainer';

const EditBuildingModal = ({ building }) => (
    <ModalOuterContainer>
        <BlockHeading title={`Edit Building - ${building.name}`} />
        <EditBuildingFormContainer building={building} />
    </ModalOuterContainer>
);

export default EditBuildingModal;

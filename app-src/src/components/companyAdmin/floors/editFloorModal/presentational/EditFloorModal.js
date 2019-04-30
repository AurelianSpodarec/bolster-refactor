import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import EditFloorFormContainer from '../containers/EditFloorFormContainer';

const EditFloorModal = ({ floor }) => (
    <ModalOuterContainer>
        <BlockHeading title={`Edit Floor - ${floor.name}`} />
        <EditFloorFormContainer floor={floor} />
    </ModalOuterContainer>
);

export default EditFloorModal;

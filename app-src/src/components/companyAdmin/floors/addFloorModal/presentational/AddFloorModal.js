import React from 'react';

import AddFloorFormContainer from '../containers/AddFloorFormContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';

const AddFloorModal = ({ buildingID }) => (
    <ModalOuterContainer>
        <BlockHeading title={'Create Floor'} />
        <AddFloorFormContainer buildingID={buildingID} />
    </ModalOuterContainer>
);

export default AddFloorModal;

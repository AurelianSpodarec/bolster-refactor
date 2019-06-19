import React from 'react';

import AddDrawingsFormContainer from '../containers/AddDrawingsFormContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';

const AddDrawingsModal = ({ floorID }) => (
    <ModalOuterContainer>
        <BlockHeading title={'Create Drawing(s)'} />
        <AddDrawingsFormContainer floorID={floorID} />
    </ModalOuterContainer>
);

export default AddDrawingsModal;

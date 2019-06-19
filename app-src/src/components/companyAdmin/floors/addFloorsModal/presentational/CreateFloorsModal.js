import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import CreateFloorsFormContainer from '../containers/CreateFloorsFormContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const CreateFloorsModal = ({ buildingID }) => (
    <ModalOuterContainer>
        <BlockHeading title={'Create Floor(s)'} />
        <CreateFloorsFormContainer buildingID={buildingID} />
    </ModalOuterContainer>
);

export default CreateFloorsModal;

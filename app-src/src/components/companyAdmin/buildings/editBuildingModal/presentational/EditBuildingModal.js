import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import EditBuildingFormContainer from '../containers/EditBuildingFormContainer';

const EditBuildingModal = ({ site }) => (
    <ModalOuterContainer>
        <BlockHeading title={`Edit Site - ${site.name}`} />
        <EditBuildingFormContainer site={site} />
    </ModalOuterContainer>
);

export default EditBuildingModal;

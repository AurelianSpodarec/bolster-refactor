import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import CreateBuildingFormContainer from '../containers/CreateBuildingFormContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const CreateBuildingModal = ({ siteID }) => (
    <ModalOuterContainer>
        <BlockHeading title={'Create Building'} />
        <CreateBuildingFormContainer siteID={siteID} />
    </ModalOuterContainer>
);

export default CreateBuildingModal;

import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import CreateBuildingsFormContainer from '../containers/CreateBuildingsFormContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const CreateBuildingsModal = ({ siteID }) => (
    <ModalOuterContainer>
        <BlockHeading title={'Create Multiple Buildings'} />
        <CreateBuildingsFormContainer siteID={siteID} />
    </ModalOuterContainer>
);

export default CreateBuildingsModal;

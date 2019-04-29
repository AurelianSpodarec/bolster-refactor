import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import AddSiteFormContainer from '../containers/AddSiteFormContainer';

const AddSiteModal = () => (
    <ModalOuterContainer>
        <BlockHeading title={'Add Site'} />
        <AddSiteFormContainer />
    </ModalOuterContainer>
);

export default AddSiteModal;

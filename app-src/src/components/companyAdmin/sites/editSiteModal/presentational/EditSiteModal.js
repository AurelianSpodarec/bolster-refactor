import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import EditSiteFormContainer from '../containers/EditSiteFormContainer';

const EditSiteModal = ({ site }) => (
    <ModalOuterContainer>
        <BlockHeading title={`Edit Site - ${site.name}`} />
        <EditSiteFormContainer site={site} />
    </ModalOuterContainer>
);

export default EditSiteModal;

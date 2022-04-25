import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import EditSitePinOptionSetsContainer from '../containers/EditSitePinOptionSetsContainer';

const EditSiteModal = ({ site }) => (
    <ModalOuterContainer>
        <BlockHeading title={`Edit Site Pin Option Sets - ${site.name}`} />
        <EditSitePinOptionSetsContainer site={site} />
    </ModalOuterContainer>
);

export default EditSiteModal;

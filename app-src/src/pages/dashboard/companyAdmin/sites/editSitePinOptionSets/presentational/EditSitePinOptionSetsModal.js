import React from 'react';

import EditSitePinOptionSetsContainer from '../containers/EditSitePinOptionSetsContainer';
import FlexModalOuter from 'components_DEPRECATED/shared/generic/modals/presentational/FlexModalOuter';

const EditSiteModal = ({ site }) => (
    <FlexModalOuter title={`Edit Site Pin Option Sets - ${site.name}`}>
        <EditSitePinOptionSetsContainer site={site} />
    </FlexModalOuter>
);

export default EditSiteModal;

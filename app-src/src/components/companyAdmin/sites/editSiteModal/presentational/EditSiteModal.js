import React from 'react';

import EditSiteFormContainer from '../containers/EditSiteFormContainer';
import FlexModalOuter from 'components/shared/generic/modals/presentational/FlexModalOuter';

const EditSiteModal = ({ site }) => (
    <FlexModalOuter title={`Edit Site - ${site.name}`}>
        <EditSiteFormContainer site={site} />
    </FlexModalOuter>
);

export default EditSiteModal;

import React from 'react';

import AddSiteFormContainer from '../containers/AddSiteFormContainer';
import FlexModalOuter from 'components/shared/generic/modals/presentational/FlexModalOuter';

const AddSiteModal = () => (
    <FlexModalOuter title="Add Site">
        <AddSiteFormContainer />
    </FlexModalOuter>
);

export default AddSiteModal;

import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import AttachBuildingOperativeFormContainer from '../containers/AttachBuildingOperativeFormContainer';

const AttachBuildingOperative = () => (
    <div>
        <Breadcrumb breadcrumbs={[{ text: 'item 1' }, { text: 'item 2' }]} />
        <AttachBuildingOperativeFormContainer />
    </div>
);

export default AttachBuildingOperative;

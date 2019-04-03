import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import AttachBuildingOperativeContainer from '../containers/AttachBuildingOperativeContainer';

const AttachBuildingOperative = () => (
    <div>
        <Breadcrumb
            breadcrumbs={[{ text: 'Building' }, { text: 'Add Operative' }]}
        />
        <AttachBuildingOperativeContainer />
    </div>
);

export default AttachBuildingOperative;

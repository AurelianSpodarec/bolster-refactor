import React from 'react';

import { HIERARCHY_IDS } from 'constants/companyAdmin/enums';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import AttachOperativesFormContainer from 'components/shared/operatives/containers/AttachOperativesFormContainer';

const AttachBuildingOperative = () => (
    <div>
        <Breadcrumb
            breadcrumbs={[{ text: 'Building' }, { text: 'Add Operative' }]}
        />
        <AttachOperativesFormContainer hierarchyType={HIERARCHY_IDS.BUILDING} />
    </div>
);

export default AttachBuildingOperative;

import React from 'react';

import { HIERARCHY_IDS } from 'constants/companyAdmin/enums';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import AttachOperativesFormContainer from 'components/shared/operatives/containers/AttachOperativesFormContainer';

const AttachSiteOperative = () => (
    <div>
        <Breadcrumb breadcrumbs={[{ text: 'Add operative' }]} />
        <AttachOperativesFormContainer hierarchyType={HIERARCHY_IDS.SITE} />
    </div>
);

export default AttachSiteOperative;

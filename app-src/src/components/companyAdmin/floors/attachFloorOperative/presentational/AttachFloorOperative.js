import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import AttachOperativesFormContainer from 'components/shared/operatives/containers/AttachOperativesFormContainer';
import { HIERARCHY_IDS } from 'constants/companyAdmin/enums';

const AttachFloorOperative = () => (
    <>
        <Breadcrumb
            breadcrumbs={[
                { text: '##floor name##' },
                { text: '##add operative##' }
            ]}
        />
        <AttachOperativesFormContainer hierarchyType={HIERARCHY_IDS.FLOOR} />
    </>
);

export default AttachFloorOperative;

import React from 'react';

import AttachOperativesFormContainer from 'components_DEPRECATED/shared/operatives/containers/AttachOperativesFormContainer';
import { HIERARCHY_IDS } from 'constants/companyAdmin/enums';
import PageHeading from 'components_DEPRECATED/shared/generic/pageHeading/presentational/PageHeading';

const AttachFloorOperative = () => (
    <>
        <PageHeading leftChildren={true} title="Attach operative" withBackButton />
        <AttachOperativesFormContainer hierarchyType={HIERARCHY_IDS.FLOOR} />
    </>
);

export default AttachFloorOperative;

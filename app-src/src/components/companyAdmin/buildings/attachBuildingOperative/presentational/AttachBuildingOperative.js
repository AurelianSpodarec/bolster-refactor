import React from 'react';

import { HIERARCHY_IDS } from 'constants/companyAdmin/enums';

import AttachOperativesFormContainer from 'components/shared/operatives/containers/AttachOperativesFormContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const AttachBuildingOperative = () => (
    <>
        <PageHeading
            leftChildren={true}
            title="Attach operative"
            withBackButton
        />
        <AttachOperativesFormContainer hierarchyType={HIERARCHY_IDS.BUILDING} />
    </>
);

export default AttachBuildingOperative;

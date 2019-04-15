import React from 'react';

import { HIERARCHY_IDS } from 'constants/companyAdmin/enums';

import AttachOperativesFormContainer from 'components/shared/operatives/containers/AttachOperativesFormContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';

const AttachBuildingOperative = () => (
    <>
        <PageHeading leftChildren={true} title="Invite operative">
            <BackButtonContainer />
        </PageHeading>
        <AttachOperativesFormContainer hierarchyType={HIERARCHY_IDS.BUILDING} />
    </>
);

export default AttachBuildingOperative;

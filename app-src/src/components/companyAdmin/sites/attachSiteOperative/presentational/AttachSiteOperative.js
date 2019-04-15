import React from 'react';

import { HIERARCHY_IDS } from 'constants/companyAdmin/enums';

import AttachOperativesFormContainer from 'components/shared/operatives/containers/AttachOperativesFormContainer';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const AttachSiteOperative = () => (
    <>
        <PageHeading leftChildren={true} title="Invite Operative">
            <BackButtonContainer />
        </PageHeading>
        <AttachOperativesFormContainer hierarchyType={HIERARCHY_IDS.SITE} />
    </>
);

export default AttachSiteOperative;

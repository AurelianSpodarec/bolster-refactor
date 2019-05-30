import React from 'react';

import { HIERARCHY_IDS } from 'constants/companyAdmin/enums';

import AttachOperativesFormContainer from 'components/shared/operatives/containers/AttachOperativesFormContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const AttachSiteOperative = () => (
    <>
        <PageHeading
            leftChildren={true}
            title="Attach Operative"
            withBackButton
        />
        <AttachOperativesFormContainer hierarchyType={HIERARCHY_IDS.SITE} />
    </>
);

export default AttachSiteOperative;

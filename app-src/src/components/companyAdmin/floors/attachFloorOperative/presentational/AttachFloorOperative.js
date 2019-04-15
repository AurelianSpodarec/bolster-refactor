import React from 'react';

import AttachOperativesFormContainer from 'components/shared/operatives/containers/AttachOperativesFormContainer';
import { HIERARCHY_IDS } from 'constants/companyAdmin/enums';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';

const AttachFloorOperative = () => (
    <>
        <PageHeading leftChildren={true} title="Invite operative">
            <BackButtonContainer />
        </PageHeading>{' '}
        <AttachOperativesFormContainer hierarchyType={HIERARCHY_IDS.FLOOR} />
    </>
);

export default AttachFloorOperative;

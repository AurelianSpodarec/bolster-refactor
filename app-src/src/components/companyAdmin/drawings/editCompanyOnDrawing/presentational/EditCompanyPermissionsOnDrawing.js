import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import EditCompanyPermissionsFormContainer from 'components/shared/companies/containers/EditCompanyPermissionsFormContainer';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';

const EditCompanyPermissionsOnDrawing = () => (
    <div className="size-lg-12">
        <PageHeading leftChildren={true} title="Edit Company Permissions">
            <BackButtonContainer />
        </PageHeading>
        <EditCompanyPermissionsFormContainer hierarchyType="drawing" />
    </div>
);

export default EditCompanyPermissionsOnDrawing;

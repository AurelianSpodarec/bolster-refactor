import React from 'react';

import PageHeading from 'components_DEPRECATED/shared/generic/pageHeading/presentational/PageHeading';
import EditCompanyPermissionsFormContainer from 'components_DEPRECATED/shared/companies/containers/EditCompanyPermissionsFormContainer';
import BackButtonContainer from 'components_DEPRECATED/shared/generic/backButton/containers/BackButtonContainer';

const EditCompanyPermissionsOnDrawing = () => (
    <div className="size-lg-12">
        <PageHeading leftChildren={true} title="Edit Company Permissions">
            <BackButtonContainer />
        </PageHeading>
        <EditCompanyPermissionsFormContainer hierarchyType="drawing" />
    </div>
);

export default EditCompanyPermissionsOnDrawing;

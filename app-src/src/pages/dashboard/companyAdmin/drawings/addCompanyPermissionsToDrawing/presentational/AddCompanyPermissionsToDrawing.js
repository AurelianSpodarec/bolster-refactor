import React from 'react';
import AddCompanyPermissionsFormContainer from 'components_DEPRECATED/shared/companies/containers/AddCompanyPermissionsFormContainer';
import PageHeading from 'components_DEPRECATED/shared/generic/pageHeading/presentational/PageHeading';

const AddCompanyPermissionsToDrawing = () => (
    <div className="size-lg-12">
        <PageHeading leftChildren={true} title="Add permissions to company" />
        <AddCompanyPermissionsFormContainer hierarchyType="drawing" />
    </div>
);

export default AddCompanyPermissionsToDrawing;

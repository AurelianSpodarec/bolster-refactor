import React from 'react';
import AddCompanyPermissionsFormContainer from 'components/shared/companies/containers/AddCompanyPermissionsFormContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const AddCompanyPermissionsToSite = () => {
    return (
        <div className="size-lg-12">
            <PageHeading
                leftChildren={true}
                title="Add permissions to company"
            />
            <AddCompanyPermissionsFormContainer hierarchyType="site" />
        </div>
    );
};

export default AddCompanyPermissionsToSite;

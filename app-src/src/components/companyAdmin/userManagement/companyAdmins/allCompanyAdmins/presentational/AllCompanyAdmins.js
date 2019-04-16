import React from 'react';

import AllCompanyAdminsTableContainer from '../containers/AllCompanyAdminsTableContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';

const AllCompanyAdmins = () => (
    <>
        <PageHeading title="All Company Admins" />

        <AllCompanyAdminsTableContainer />
    </>
);

export default AllCompanyAdmins;

import React from 'react';

import AllCompanyAdminsTableContainer from '../containers/AllCompanyAdminsTableContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const AllCompanyAdmins = () => (
    <>
        <PageHeading title="All Admins" withBackButton />
        <AllCompanyAdminsTableContainer />
    </>
);

export default AllCompanyAdmins;

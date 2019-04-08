import React from 'react';
import { Link } from 'react-router-dom';

import AllCompanyAdminsTableContainer from '../containers/AllCompanyAdminsTableContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';

const AllCompanyAdmins = () => (
    <>
        <Breadcrumb breadcrumbs={[{ text: 'All Company Admins' }]} />
        <PageHeading title="All Company Admins">
            <Link
                className="button"
                to="/company/users-management/company-admins/create"
            >
                <i className="fa fa-plus" /> Add Company Admin
            </Link>
        </PageHeading>

        <AllCompanyAdminsTableContainer />
    </>
);

export default AllCompanyAdmins;

import React from 'react';
import { Link } from 'react-router-dom';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import AllCompanyAdminsTableContainer from '../containers/AllCompanyAdminsTableContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';

const AllCompanyAdmins = () => (
    <>
        <Breadcrumb breadcrumbs={[{ text: 'All Company Admins' }]} />
        <PageHeading title="All Company Admins">
            <Link
                className="button"
                to="/users-management/company-admins/create"
            >
                <i className="fa fa-plus" /> Add Company Admin
            </Link>
        </PageHeading>
        <BlockContainer>
            <AllCompanyAdminsTableContainer />
        </BlockContainer>
    </>
);

export default AllCompanyAdmins;

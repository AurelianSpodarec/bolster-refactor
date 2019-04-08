import React from 'react';
import { Link } from 'react-router-dom';

import AllOperativesTableContainer from '../containers/AllOperativesTableContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';

const AllOperatives = () => (
    <>
        <Breadcrumb breadcrumbs={[{ text: 'All Operatives' }]} />

        <PageHeading title="All Operatives">
            <Link
                className="button"
                to="/company/users-management/operatives/create"
            >
                <i className="fa fa-plus" /> Add Operative
            </Link>
        </PageHeading>

        <AllOperativesTableContainer />
    </>
);

export default AllOperatives;

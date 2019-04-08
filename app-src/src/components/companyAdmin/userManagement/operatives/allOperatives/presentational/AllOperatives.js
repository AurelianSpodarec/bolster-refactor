import React from 'react';
import { Link } from 'react-router-dom';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
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
        <BlockContainer>
            <AllOperativesTableContainer />
        </BlockContainer>
    </>
);

export default AllOperatives;

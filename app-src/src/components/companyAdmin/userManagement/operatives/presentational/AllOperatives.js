import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import AllOperativesTableContainer from '../containers/AllOperativesTableContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';

const AllOperatives = () => (
    <>
        <Breadcrumb breadcrumbs={[{ text: 'All Operatives' }]} />

        <PageHeading title="All Operatives">
            <button className="button">
                <i className="fa fa-plus" /> Add Operative
            </button>
        </PageHeading>
        <BlockContainer>
            <AllOperativesTableContainer />
        </BlockContainer>
    </>
);

export default AllOperatives;

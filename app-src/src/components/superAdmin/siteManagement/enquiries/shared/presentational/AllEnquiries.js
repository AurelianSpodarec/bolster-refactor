import React from 'react';

import EnquiriesTableContainer from '../containers/EnquiriesTableContainer';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const AllEnquiries = () => (
    <>
        <Breadcrumb breadcrumbs={[{ text: 'User Enquiries' }]} />
        <PageHeading title="User Enquiries" withBackButton />
        <BlockContainer>
            <EnquiriesTableContainer />
        </BlockContainer>
    </>
);

export default AllEnquiries;

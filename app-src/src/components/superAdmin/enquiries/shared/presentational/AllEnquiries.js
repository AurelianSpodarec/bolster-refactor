import React from 'react';

import EnquiriesTableContainer from '../containers/EnquiriesTableContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const AllEnquiries = () => (
    <>
        <PageHeading title="User Enquiries" withBackButton />
        <BlockContainer>
            <BlockHeading title="All User Enquiries" />
            <EnquiriesTableContainer />
        </BlockContainer>
    </>
);

export default AllEnquiries;

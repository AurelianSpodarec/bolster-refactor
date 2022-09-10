import React from 'react';

import ContactSubmissionsTableContainer from '../containers/ContactSubmissionsTableContainer';
import BlockContainer from 'components_DEPRECATED/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components_DEPRECATED/shared/generic/pageHeading/presentational/PageHeading';
import BlockHeading from 'components_DEPRECATED/shared/generic/blockHeading/presentational/BlockHeading';

const AllContactSubmissions = () => (
    <>
        <PageHeading title="Contact Submissions" />
        <BlockContainer>
            <BlockHeading title="All Contact Submissions" />
            <ContactSubmissionsTableContainer />
        </BlockContainer>
    </>
);

export default AllContactSubmissions;

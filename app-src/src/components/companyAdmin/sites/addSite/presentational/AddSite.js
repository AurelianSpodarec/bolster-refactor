import React from 'react';

import AddSiteFormContainer from '../containers/AddSiteFormContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const AddSite = () => (
    <>
        <PageHeading leftChildren={true} title="Add Site">
            <BackButtonContainer />
        </PageHeading>
        <BlockContainer>
            <BlockHeading title="Site details" />
            <AddSiteFormContainer />
        </BlockContainer>
    </>
);

export default AddSite;

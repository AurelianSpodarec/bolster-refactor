import React from 'react';

import BlockContainer from 'components_DEPRECATED/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components_DEPRECATED/shared/generic/pageHeading/presentational/PageHeading';
import CreateOperativeFormContainer from '../containers/CreateOperativeFormContainer';
import BlockHeading from 'components_DEPRECATED/shared/generic/blockHeading/presentational/BlockHeading';
import BackButtonContainer from 'components_DEPRECATED/shared/generic/backButton/containers/BackButtonContainer';

const CreateOperative = () => (
    <>
        <PageHeading leftChildren={true} title="Invite Operative">
            <BackButtonContainer />
        </PageHeading>

        <BlockContainer>
            <BlockHeading title="Operative Details" />
            <CreateOperativeFormContainer />
        </BlockContainer>
    </>
);

export default CreateOperative;

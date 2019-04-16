import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import CreateOperativeFormContainer from '../containers/CreateOperativeFormContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';

const CreateOperative = () => (
    <>
        <PageHeading leftChildren={true} title="Invite Operative">
            <BackButtonContainer />
        </PageHeading>

        <BlockContainer>
            <BlockHeading title="Operatvie Details" />
            <CreateOperativeFormContainer />
        </BlockContainer>
    </>
);

export default CreateOperative;

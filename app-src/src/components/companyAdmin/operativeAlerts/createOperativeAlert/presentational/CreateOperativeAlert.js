import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import CreateOperativeAlertFormContainer from '../containers/CreateOperativeAlertFormContainer';

const CreateOperativeAlert = () => (
    <>
        <PageHeading
            leftChildren={true}
            title="Create Operative Alert"
            withBackButton
        />
        <BlockContainer>
            <BlockHeading title="Alert Details" />
            <CreateOperativeAlertFormContainer />
        </BlockContainer>
    </>
);

export default CreateOperativeAlert;

import React from 'react';

import EditClientFormContainer from '../containers/EditClientFormContainer';
import PageHeading from 'components_DEPRECATED/shared/generic/pageHeading/presentational/PageHeading';
import BackButtonContainer from 'components_DEPRECATED/shared/generic/backButton/containers/BackButtonContainer';
import BlockContainer from 'components_DEPRECATED/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components_DEPRECATED/shared/generic/blockHeading/presentational/BlockHeading';

const ClientEdit = ({ firstName, lastName }) => (
    <>
        <PageHeading leftChildren={true} title={`Edit Client: ${firstName} ${lastName}`}>
            <BackButtonContainer />
        </PageHeading>
        <BlockContainer>
            <BlockHeading title="Edit Client" />
            <EditClientFormContainer />
        </BlockContainer>
    </>
);

export default ClientEdit;

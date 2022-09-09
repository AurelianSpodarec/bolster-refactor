import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import EditSettingsFormContainer from '../containers/EditSettingsFormContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const EditSettings = ({ isFetching, companySettings: company }) => (
    <>
        <PageHeading leftChildren={true} title="Edit Company Settings" withBackButton />
        <BlockContainer isFetching={isFetching} isEmpty={!company.name}>
            <BlockHeading title="Company Details" />
            <EditSettingsFormContainer />
        </BlockContainer>
    </>
);

export default EditSettings;

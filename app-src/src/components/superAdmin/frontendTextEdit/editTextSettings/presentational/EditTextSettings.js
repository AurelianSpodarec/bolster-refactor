import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import EditTextSettingsFormContainer from '../containers/EditTextSettingsFormContainer';

const EditTextSettings = () => {
    return (
        <>
            <PageHeading title="Edit Text Settings" withBackButton />
            <BlockContainer>
                <BlockHeading title="Text Settings" />
                <EditTextSettingsFormContainer />
            </BlockContainer>
        </>
    );
};

export default EditTextSettings;

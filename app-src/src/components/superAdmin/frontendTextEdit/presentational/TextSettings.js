import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import TextSettingsFormContainer from '../presentational/TextSettingsForm';

const TextEditor = () => {
    return (
        <>
            <PageHeading title="Frontend Text Settings" withBackButton />
            <TextSettingsFormContainer />
        </>
    );
};

export default TextEditor;

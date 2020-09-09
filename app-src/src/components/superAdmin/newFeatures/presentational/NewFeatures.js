import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import NewFeaturesTableContainer from '../containers/NewFeaturesTableContainer';

export default function NewFeatures() {
    return (
        <>
            <PageHeading title="New Features" withBackButton />

            <NewFeaturesTableContainer />
        </>
    );
}

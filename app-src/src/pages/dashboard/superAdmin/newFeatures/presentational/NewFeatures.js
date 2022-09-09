import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import NewFeaturesTableContainer from '../containers/NewFeaturesTableContainer';

const NewFeatures = () => (
    <>
        <PageHeading title="New Features" />

        <NewFeaturesTableContainer />
    </>
);

export default NewFeatures;

import React from 'react';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import ExpiryFormContainer from '../containers/ExpiryToolFormContainer';

const ExpiryTool = () => (
    <>
        <PageHeading title="Expiry Tool" withBackButton />
        <ExpiryFormContainer />
    </>
);

export default ExpiryTool;

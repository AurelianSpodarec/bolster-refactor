import React from 'react';
import PageHeading from 'components_DEPRECATED/shared/generic/pageHeading/presentational/PageHeading';
import ExpiryFormContainer from '../containers/ExpiryToolFormContainer';

const ExpiryTool = () => (
    <>
        <PageHeading title="Expiry Tool" />
        <ExpiryFormContainer />
    </>
);

export default ExpiryTool;

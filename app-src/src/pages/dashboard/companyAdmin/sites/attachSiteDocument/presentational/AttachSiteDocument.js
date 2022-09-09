import React from 'react';

import AttachDocumentFormContainer from 'components/shared/documents/containers/AttachDocumentFormContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const AttachSiteDocument = () => (
    <>
        <PageHeading title="Attach Document" withBackButton />

        <AttachDocumentFormContainer hierarchyType="site" />
    </>
);

export default AttachSiteDocument;

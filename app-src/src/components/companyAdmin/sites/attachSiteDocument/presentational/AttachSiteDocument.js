import React from 'react';

import Breadcrumbs from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import AttachDocumentFormContainer from 'components/shared/documents/containers/AttachDocumentFormContainer';

const AttachSiteDocument = () => (
    <>
        <Breadcrumbs
            breadcrumbs={[
                { text: 'Sites' },
                { text: 'Site ID' },
                { text: 'Attach Document' }
            ]}
        />

        <AttachDocumentFormContainer hierarchyType="site" />
    </>
);

export default AttachSiteDocument;

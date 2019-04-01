import React from 'react';

import Breadcrumbs from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import AttachDocumentFormContainer from 'components/shared/documents/containers/AttachDocumentFormContainer';

const AttachSiteDocument = ({ handleSubmit, backUrl, siteID }) => (
    <div>
        <Breadcrumbs
            breadcrumbs={[
                { text: 'Sites' },
                { text: siteID },
                { text: 'Attach Document' }
            ]}
        />
        <AttachDocumentFormContainer
            handleSubmit={handleSubmit}
            backUrl={backUrl}
        />
    </div>
);

export default AttachSiteDocument;

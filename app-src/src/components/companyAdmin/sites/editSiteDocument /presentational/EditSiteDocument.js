import React from 'react';

import Breadcrumbs from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import AttachDocumentFormContainer from 'components/shared/documents/containers/AttachDocumentFormContainer';

const EditSiteDocument = ({ handleSubmit, siteID }) => (
    <div>
        <Breadcrumbs
            // ? what is the route?
            breadcrumbs={[
                { text: '##' },
                { text: 'Sites' },
                { text: siteID },
                { text: 'Edit Document' },
                { text: '##' }
            ]}
        />
        <AttachDocumentFormContainer
            handleSubmit={handleSubmit}
            // ! this needs sorting
            // backUrl={backUrl}
        />
    </div>
);

export default EditSiteDocument;

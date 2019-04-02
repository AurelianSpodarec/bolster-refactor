import React from 'react';

import Breadcrumbs from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import EditDocumentFormContainer from 'components/shared/documents/containers/EditDocumentFormContainer';

const EditSiteDocument = ({ handleSubmit, siteID, documentID }) => (
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
        <EditDocumentFormContainer
            handleSubmit={handleSubmit}
            documentID={documentID}
            // ! this needs sorting
            // backUrl={backUrl}
        />
    </div>
);

export default EditSiteDocument;

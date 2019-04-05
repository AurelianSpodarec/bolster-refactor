import React from 'react';

import Breadcrumbs from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import EditDocumentFormContainer from 'components/shared/documents/containers/EditDocumentFormContainer';

const EditSiteDocument = () => (
    <>
        <Breadcrumbs
            // ? what is the route?
            breadcrumbs={[
                { text: '##' },
                { text: 'Sites' },
                { text: 'Site ID' },
                { text: 'Edit Document' },
                { text: '##' }
            ]}
        />
        <EditDocumentFormContainer hierarchyType="site" />
    </>
);

export default EditSiteDocument;

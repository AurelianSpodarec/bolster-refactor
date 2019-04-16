import React from 'react';

import Breadcrumbs from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import EditDocumentFormContainer from 'components/shared/documents/containers/EditDocumentFormContainer';

const EditSiteDocument = () => (
    <>
        <EditDocumentFormContainer hierarchyType="Site" />
    </>
);

export default EditSiteDocument;

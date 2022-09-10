import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components_DEPRECATED/appRoute/routes/presentational/SwitchWith404';
import AllLegalDocumentsTableContainer from 'pages/dashboard/superAdmin/legalDocuments/allLegalDocuments/containers/AllLegalDocumentsTableContainer';
import CreateLegalDocumentContainer from 'pages/dashboard/superAdmin/legalDocuments/createLegalDocument/containers/CreateLegalDocumentContainer';
import UpdateLegalDocumentVersionContainer from 'pages/dashboard/superAdmin/legalDocuments/addLegalDocumentVersion/containers/UpdateLegalDocumentVersion';

const LegalDocumentsRoutes = ({ base = '/admin/legal-documents' }) => (
    <SwitchWith404>
        <Route exact path={base} component={AllLegalDocumentsTableContainer} />
        <Route exact path={`${base}/new`} component={CreateLegalDocumentContainer} />
        <Route exact path={`${base}/edit/:id`} component={UpdateLegalDocumentVersionContainer} />
        <Route exact path={`${base}/update/:id`} component={UpdateLegalDocumentVersionContainer} />
    </SwitchWith404>
);

export default LegalDocumentsRoutes;

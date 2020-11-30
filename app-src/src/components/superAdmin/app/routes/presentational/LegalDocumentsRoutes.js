import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import AllLegalDocumentsTableContainer from 'components/superAdmin/legalDocuments/allLegalDocuments/containers/AllLegalDocumentsTableContainer';
import CreateLegalDocumentContainer from 'components/superAdmin/legalDocuments/createLegalDocument/containers/CreateLegalDocumentContainer';
import AddLegalDocumentVersionContainer from 'components/superAdmin/legalDocuments/addLegalDocumentVersion/containers/AddLegalDocumentVersionContainer';
import EditLegalDocumentVersionContainer from 'components/superAdmin/legalDocuments/addLegalDocumentVersion/containers/EditLegalDocumentVersionContainer';

const LegalDocumentsRoutes = ({ base = '/admin/legal-documents' }) => (
    <SwitchWith404>
        <Route exact path={base} component={AllLegalDocumentsTableContainer} />
        <Route exact path={`${base}/new`} component={CreateLegalDocumentContainer} />
        <Route exact path={`${base}/edit/:id`} component={EditLegalDocumentVersionContainer} />
        <Route exact path={`${base}/update/:id`} component={AddLegalDocumentVersionContainer} />
    </SwitchWith404>
);

export default LegalDocumentsRoutes;

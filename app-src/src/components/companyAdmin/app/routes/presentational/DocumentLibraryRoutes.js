import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import DocumentLibrary from 'components/companyAdmin/documentLibrary/DocumentLibrary';

const DocumentLibraryRoutes = ({ base = '/company/company-documents' }) => (
    <SwitchWith404>
        <Route exact path={`${base}`} component={DocumentLibrary} />
    </SwitchWith404>
);

export default DocumentLibraryRoutes;

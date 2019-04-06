import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/appRoute/routes/presentational/SwitchWith404';
import TestFileUploadPage from 'components/test/fileUpload/presentational/TestFileUploadPage';

const TestRoutes = ({ base = '/test' }) => (
    <SwitchWith404>
        <Route path={`${base}/file-upload`} component={TestFileUploadPage} />
    </SwitchWith404>
);

export default TestRoutes;

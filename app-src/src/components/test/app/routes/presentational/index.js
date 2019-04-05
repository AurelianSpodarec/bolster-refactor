import React from 'react';
import { Route } from 'react-router-dom';

import SwitchWith404 from 'components/shared/app/routes/presentational/SwitchWith404';
import TestFileUploadFormContainer from 'components/test/fileUpload/containers/TestFileUploadFormContainer';

const TestRoutes = ({ base = '/test' }) => (
    <SwitchWith404>
        <Route
            path={`${base}/file-upload`}
            component={TestFileUploadFormContainer}
        />
    </SwitchWith404>
);

export default TestRoutes;

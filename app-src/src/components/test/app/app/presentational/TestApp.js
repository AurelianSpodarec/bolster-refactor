import React from 'react';

import TestRoutes from 'components/test/app/routes/presentational';
import AuthHeader from 'components/auth/layout/header/presentational/AuthHeader';

const TestApp = () => (
    <>
        <AuthHeader />
        <div className="full-container container">
            <div id="page-area" className="full">
                <TestRoutes />
            </div>
        </div>
    </>
);

export default TestApp;

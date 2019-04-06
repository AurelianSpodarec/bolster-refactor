import React from 'react';

import AuthHeader from 'components/auth/layout/header/presentational/AuthHeader';
import AuthRoutes from 'components/auth/app/routes/presentational';

const AuthApp = () => (
    <>
        <AuthHeader />
        <div className="full-container container">
            <div id="page-area" className="full">
                <AuthRoutes />
            </div>
        </div>
    </>
);

export default AuthApp;

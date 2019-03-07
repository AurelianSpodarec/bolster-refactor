import React from 'react';

import LoginFormContainer from '../containers/LoginFormContainer';

const Login = () => (
    <div className="auth size-lg-12">
        <div className="content-container size-lg-12">
            <h1 className="heading heading-1 size-lg-12">Log In</h1>

            <div className="content-area size-lg-12">
                <h3 className="heading heading-3 size-lg-12">
                    Enter your login details
                </h3>
                <LoginFormContainer />
            </div>
        </div>
    </div>
);

export default Login;

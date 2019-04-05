import React from 'react';

import LoginFormContainer from '../containers/LoginFormContainer';
import Block from 'components/shared/generic/block/presentational/Block';

const Login = () => (
    <div className="auth size-lg-12">
        <div className="content-container size-lg-12">
            <h1 className="heading heading-1 size-lg-12">Log In</h1>
        </div>

        <Block>
            <h3 className="heading heading-3 size-lg-12">
                Enter your login details
            </h3>
            <LoginFormContainer />
        </Block>
    </div>
);

export default Login;

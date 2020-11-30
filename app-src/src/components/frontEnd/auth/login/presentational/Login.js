import React from 'react';

import { pageMeta } from 'constants/frontEnd/meta';

import ServerRoom from '_content/images/frontend-new/login/server-room.png';
import LoginFormContainer from '../containers/LoginFormContainer';
import PageMeta from 'components/frontEnd/shared/meta/presentational/PageMeta';
import LoginTextBody from './LoginTextBody';

const Login = ({ loginText, error, isFetching }) => {
    return (
        <>
            <PageMeta meta={pageMeta.login} />
            <div id="login">
                <div className="auth-background"></div>
                <img
                    src={ServerRoom}
                    alt="Server room background video"
                    className="auth-background-video"
                />
                <div className="auth-wrapper">
                    <div className="heading-body-wrapper">
                        <div className="auth-heading">
                            <heading>
                                <h1>Login</h1>
                            </heading>
                        </div>
                        <LoginTextBody
                            loginText={loginText}
                            error={error}
                            isFetching={isFetching}
                        />
                    </div>
                    <LoginFormContainer />
                </div>
            </div>
        </>
    );
};

export default Login;

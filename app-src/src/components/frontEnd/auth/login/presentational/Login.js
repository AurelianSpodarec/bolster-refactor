import React from 'react';

import { pageMeta } from 'constants/frontEnd/meta';

import LoginVideo from '_content/videos/frontend/Login.mp4';
import LoginPoster from '_content/videos/frontend/posters/Login.jpg';
import LoginFormContainer from '../containers/LoginFormContainer';
import PageMeta from 'components/frontEnd/shared/meta/presentational/PageMeta';

const Login = () => {
    return (
        <>
            <PageMeta meta={pageMeta.login} />
            <div id="login">
                <div className="auth-background"></div>
                <video className="auth-background-video" autoPlay loop muted poster={LoginPoster}>
                    <source src={LoginVideo} type="video/mp4" />
                </video>
                <div className="auth-wrapper">
                    <div className="heading-body-wrapper"></div>
                    <LoginFormContainer />
                </div>
            </div>
        </>
    );
};

export default Login;

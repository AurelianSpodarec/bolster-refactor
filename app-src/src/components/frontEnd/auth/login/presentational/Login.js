import React from 'react';

import ServerRoomBackgroundVideo from '_content/videos/frontend/Server_Room.mp4';
import LoginFormContainer from '../containers/LoginFormContainer';
import Helmet from 'components/frontEnd/shared/meta/presentational/Helmet';
import LoginTextBody from './LoginTextBody';

const Login = ({ registerText, error, isFetching }) => {
    return (
        <>
            <Helmet title="Login" />
            <div id="login">
                <div className="auth-background"></div>
                <video className="auth-background-video" autoPlay="autoplay" loop muted>
                    <source src={ServerRoomBackgroundVideo} type="video/mp4" />
                </video>
                <div className="auth-wrapper">
                    <div className="heading-body-wrapper">
                        <div className="auth-heading">
                            <heading>
                                <h1>Login</h1>
                            </heading>
                        </div>
                        <LoginTextBody
                            registerText={registerText}
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

import React from 'react';

import { pageMeta } from 'constants/frontEnd/meta';

import RegisterFormContainer from '../containers/RegisterFormContainer';
import ServerRoomBackgroundVideo from '_content/videos/frontend/Server_Room_Long.mp4';
import PageMeta from 'components/frontEnd/shared/meta/presentational/PageMeta';
import RegisterTextBody from './RegisterTextBody';

const Register = ({ registerText, error, isFetching }) => {
    return (
        <>
            <PageMeta meta={pageMeta.register} />
            <div id="register">
                <div className="auth-background"></div>
                <video className="auth-background-video" autoPlay="autoplay" loop muted>
                    <source src={ServerRoomBackgroundVideo} type="video/mp4" />
                </video>
                <div className="auth-wrapper register">
                    <div className="heading-body-wrapper">
                        <div className="auth-heading">
                            <heading>
                                <h1>Registering with Bolster Systems</h1>
                            </heading>
                        </div>
                        <RegisterTextBody
                            registerText={registerText}
                            error={error}
                            isFetching={isFetching}
                        />
                    </div>
                    <RegisterFormContainer />
                </div>
            </div>
        </>
    );
};

export default Register;

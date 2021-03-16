import React from 'react';

import { pageMeta } from 'constants/frontEnd/meta';

import RegisterFormContainer from '../containers/RegisterFormContainer';
import RegisterVideo from '_content/videos/frontend/Register.mp4';
import RegisterPoster from '_content/videos/frontend/posters/Register.jpg';
import PageMeta from 'components/frontEnd/shared/meta/presentational/PageMeta';

const Register = () => {
    return (
        <>
            <PageMeta meta={pageMeta.register} />
            <div id="register">
                <div className="auth-background"></div>
                <video
                    className="auth-background-video"
                    autoPlay
                    loop
                    muted
                    poster={RegisterPoster}
                >
                    <source src={RegisterVideo} type="video/mp4" />
                </video>
                <div className="auth-wrapper register">
                    <div className="heading-body-wrapper"></div>
                    <RegisterFormContainer />
                </div>
            </div>
        </>
    );
};

export default Register;

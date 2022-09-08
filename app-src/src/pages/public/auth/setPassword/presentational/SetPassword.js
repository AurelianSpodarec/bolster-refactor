import React from 'react';
import { useIsMobile } from 'helpers/hooks';
import LoginVideo from '_content/videos/frontend/Login.mp4';
import LoginPoster from '_content/videos/frontend/posters/Login.jpg';
import SetPasswordFormContainer from '../containers/SetPasswordFormContainer';

const SetPassword = () => {
    const isMobile = useIsMobile(1101);

    return (
        <>
            <div id="login">
                <div className="auth-background"></div>
                <video
                    className="auth-background-video"
                    autoPlay={!isMobile}
                    loop
                    muted
                    poster={LoginPoster}
                >
                    <source src={LoginVideo} type="video/mp4" />
                </video>
                <div className="auth-wrapper">
                    <div className="heading-body-wrapper"></div>
                    <SetPasswordFormContainer />
                </div>
            </div>
        </>
    );
};

export default SetPassword;

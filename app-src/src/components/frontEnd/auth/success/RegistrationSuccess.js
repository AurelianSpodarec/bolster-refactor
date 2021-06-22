import React from 'react';

import LoginVideo from '_content/videos/frontend/Login.mp4';
import LoginPoster from '_content/videos/frontend/posters/Login.jpg';
import { useIsMobile } from 'helpers/hooks';
import FrontEndFormHeading from 'components/frontEnd/shared/forms/presentational/FrontEndFormHeading';

const RegistrationSuccess = () => {
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

                    <div className="auth-form-wrapper login">
                        <FrontEndFormHeading title="Registration Success" classes="smaller" />

                        <div className="auth-text-wrapper login-text">
                            <p>
                                Thank you for registering with Bolster Systems. To proceed, please
                                confirm your email address through the link sent to your inbox.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegistrationSuccess;

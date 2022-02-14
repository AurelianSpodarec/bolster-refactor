import React from 'react';

import LoginVideo from '_content/videos/frontend/Login.mp4';
import LoginPoster from '_content/videos/frontend/posters/Login.jpg';
import { useIsMobile } from 'helpers/hooks';
import FrontEndFormHeading from 'components/frontEnd/shared/forms/presentational/FrontEndFormHeading';

const InvitationAcceptedOperative = () => {
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
                        <FrontEndFormHeading title="Invitation Accepted" classes="smaller" />

                        <div className="auth-text-wrapper login-text">
                            <p>
                                You have now successfully accepted your invite as an operative. You
                                can now login to the Bolster Systems app.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InvitationAcceptedOperative;

import React from 'react';

import { pageMeta } from 'constants/frontEnd/meta';

import ContactPageFormContainer from '../containers/ContactPageFormContainer';
import ServerRoomBackgroundVideo from '_content/videos/frontend/Server_Room_Long.mp4';
import ServerRoomBackgroundPoster from '_content/videos/frontend/posters/Server_Room_Long.jpg';
import PageMeta from 'components/frontEnd/shared/meta/presentational/PageMeta';

const ContactPage = () => {
    return (
        <>
            <PageMeta meta={pageMeta.contact} />
            <div id="contact">
                <div className="contact-background"></div>
                <video
                    className="auth-background-video"
                    autoPlay
                    muted
                    playsInline
                    poster={ServerRoomBackgroundPoster}
                >
                    <source src={ServerRoomBackgroundVideo} type="video/mp4" />
                </video>
                <div className="auth-wrapper">
                    <div className="heading-body-wrapper"></div>

                    <ContactPageFormContainer />
                </div>
            </div>
        </>
    );
};

export default ContactPage;

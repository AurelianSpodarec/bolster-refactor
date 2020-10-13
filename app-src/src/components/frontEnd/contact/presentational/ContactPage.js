import React from 'react';

import ContactInfoContainer from '../containers/ContactInfoContainer';
import ContactPageFormContainer from '../containers/ContactPageFormContainer';
import ServerRoomBackgroundVideo from '_content/videos/frontend/Server_Room.mp4';
import Helmet from 'components/frontEnd/shared/meta/presentational/Helmet';

const ContactPage = () => {
    return (
        <>
            <Helmet title="Contact" />
            <div id="contact">
                <div className="contact-background"></div>
                <video
                    className="contact-background-video"
                    autoPlay="autoplay"
                    loop
                    muted
                    playsInline
                >
                    <source src={ServerRoomBackgroundVideo} type="video/mp4" />
                </video>
                <div className="contact-form-wrapper">
                    <div className="heading">
                        <h1>Contact</h1>
                        <p>
                            The best way to ensure our system is right for your company is to see it
                            for yourself! Bolster Systems offer full demos exploring both the
                            desktop and application platforms of the system, its functionality, ease
                            of use and key benefits.
                            <br />
                            <br />
                            If you would like any further information on our system or to arrange a
                            demo, please fill in the contact form below and a member of the Bolster
                            Systems team will get back to you.
                        </p>
                    </div>
                    <div className="contact-section">
                        <ContactPageFormContainer />
                        <ContactInfoContainer />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactPage;

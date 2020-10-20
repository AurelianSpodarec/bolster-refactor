import React from 'react';

import ContactInfo from './ContactInfo';
import ContactPageFormContainer from '../containers/ContactPageFormContainer';
import ServerRoomBackgroundVideo from '_content/videos/frontend/Server_Room_Long.mp4';
import Helmet from 'components/frontEnd/shared/meta/presentational/Helmet';

const ContactPage = () => {
    return (
        <>
            <Helmet title="Contact" />
            <div id="contact">
                <div className="contact-background"></div>
                <video
                    className="auth-background-video"
                    autoPlay="autoplay"
                    muted
                    playsInline
                >
                    <source src={ServerRoomBackgroundVideo} type="video/mp4" />
                </video>
                <div className="auth-wrapper">
                    <div className="heading-body-wrapper">
                        <div className="auth-heading">
                            <heading>
                            <h1>Contact</h1>
                            </heading>
                        </div>
                        <p>
                            Bolster Systems offer a full demo exploring both the
                            desktop and application platforms of the system, its functionality, ease
                            of use and key benefits.
                            <br />
                            <br />
                            If you would like any further information on our system or to arrange a
                            demo, please fill in the contact form and a member of the Bolster
                            Systems team will get back to you.
                        </p>
                        <ContactInfo />
                    </div>
                        
                    <ContactPageFormContainer />
                </div>
            </div>
        </>
    );
};

export default ContactPage;

import React from 'react';

import ContactInfoContainer from '../containers/ContactInfoContainer';
import ContactPageFormContainer from '../containers/ContactPageFormContainer';
import ServerRoomBackgroundVideo from '_content/images/frontend-new/contact/icons/video/Server_Room.mp4';

const ContactPage = () => {
    return (
        <div id="contact" className="size-lg-12">
            <video className="contact-background-video" autoPlay="autoplay" loop muted>
                <source src={ServerRoomBackgroundVideo} type="video/mp4" />
            </video>
            <div className="contact-background"></div>
            <div className="contact-form-wrapper">
                <div className="contact-heading">
                    <heading>
                        <h1>Contact</h1>
                    </heading>
                    <p>Neque porro quisquam est qui do lorem amet</p>
                </div>
                <div className="contact-section">
                    <ContactPageFormContainer />
                    <ContactInfoContainer />
                </div>
            </div>
        </div>
    );
};

export default ContactPage;

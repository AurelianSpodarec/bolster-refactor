import React from 'react';

import ContactInfoContainer from '../containers/ContactInfoContainer';
import ContactPageFormContainer from '../containers/ContactPageFormContainer';

const ContactPage = () => {
    return (
        <div id="contact" className="size-lg-12">
            <div className="contact-background"></div>
            <div className="contact-wrapper">
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

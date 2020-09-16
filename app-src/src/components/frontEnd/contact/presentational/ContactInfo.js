import React from 'react';

import TwitterIcon from '_content/images/frontend-new/contact/icons/Twitter-icon.png';
import FacebookIcon from '_content/images/frontend-new/contact/icons/Facebook-icon.png';
import VimeoIcon from '_content/images/frontend-new/contact/icons/Vimeo-icon.png';

const ContactInfo = () => {
    return (
        <div className="contact-info-wrapper">
            <p>
                <strong>Phone</strong>
                <br />
                0161 873 7679
            </p>
            <p>
                <strong>Email</strong>
                <br />
                <a href="mailto:info@bolstersystems.com">info@bolstersystems.com</a>
            </p>
            <p>
                <strong>Company Address</strong>
                <br />
                The Studio, The Schoolhouse, 2nd Avenue
                <br />
                Trafford Park
                <br />
                Manchester
                <br />
                M17 1DZ
            </p>
            <a
                className="social-link-container"
                href="https://twitter.com/bolstersystems?lang=en"
                rel="noopener noreferrer"
                target="_blank"
            >
                <img className="contact-icons" src={TwitterIcon} />
                <div>Follow us on Twitter</div>
            </a>
            <a
                className="social-link-container"
                href="https://facebook.com/BolsterSystems/"
                rel="noopener noreferrer"
                target="_blank"
            >
                <img className="contact-icons" src={FacebookIcon} />
                <div>Like us on Facebook</div>
            </a>
            <a
                className="social-link-container"
                href="https://vimeo.com/bolstersystems"
                rel="noopener noreferrer"
                target="_blank"
            >
                <img className="contact-icons" src={VimeoIcon} /> <div>Follow us on Vimeo</div>
            </a>
        </div>
    );
};

export default ContactInfo;

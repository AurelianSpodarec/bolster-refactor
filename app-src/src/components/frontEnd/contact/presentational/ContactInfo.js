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
                <a href="tel:01618737679">0161 873 7679</a>
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
        </div>
    );
};

export default ContactInfo;

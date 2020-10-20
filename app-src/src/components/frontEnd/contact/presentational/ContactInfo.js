import React from 'react';

const ContactInfo = () => {
    return (
        <div className="contact-info-wrapper">
            <div className="contact-info-row columns">
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
            </div>
            
            <div className="contact-info-row">
                <p className="full">
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
        </div>
    );
};

export default ContactInfo;

import React from 'react';

import FrontEndButton from 'components/frontEnd/shared/buttons/presentational/FrontEndButton';
import FrontEndPageHeading from 'components/frontEnd/shared/headings/presentational/FrontEndPageHeading';
import ContactPageFormContainer from '../containers/ContactPageFormContainer';

import backgroundImage from '_content/images/frontend/banners/contact-phone-img-fade.jpg';
import twitterIcon from '_content/images/frontend/twitter-icon.png';

const ContactPage = () => (
    <div className="size-lg-12" id="contact">
        <FrontEndPageHeading
            backgroundImage={backgroundImage}
            title="Contact us"
            subTitle="If you would like to find out more about Bolster Systems and how we can Bolster your systems please contact us using the details below."
        />
        <div className="bottom">
            <div className="container">
                <div className="info">
                    <div className="address">
                        <h3>How to find us</h3>
                        <ul>
                            <li>Bolster Systems</li>
                            <li>7 The Schoolhouse</li>
                            <li>Second Avenue</li>
                            <li>Trafford Park</li>
                            <li>Manchester</li>
                            <li>M17 1DZ</li>
                            <li>
                                Tel: <span>0161 873 7679</span>
                            </li>
                            <li>
                                Email:
                                <span>
                                    <a href="mailto:info@bolstersystems.com">
                                        info@bolstersystems.com
                                    </a>
                                </span>
                            </li>
                            <li>
                                <img
                                    src={twitterIcon}
                                    alt="twitter icon"
                                    style={{
                                        float: 'left',
                                        height: 24,
                                        marginRight: 5
                                    }}
                                />
                                <span>
                                    <a
                                        href="https://twitter.com/bolstersystems"
                                        _target="blank"
                                    >
                                        &#64;bolstersystems
                                    </a>
                                </span>
                            </li>
                        </ul>
                        <div className="map">
                            <iframe
                                title="Bolster Map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4750.5947512658395!2d-2.3061091755542704!3d53.463145278484724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487bae7ca6bf05e3%3A0x24ff29cb873cd8e1!2sThe+Schoolhouse%2C+Second+Ave%2C+Stretford%2C+Manchester+M17+1DZ!5e0!3m2!1sen!2suk!4v1429875695967"
                                style={{ border: 0 }}
                            />
                        </div>
                    </div>
                    <ContactPageFormContainer />
                </div>
                <div className="banner">
                    <div className="wrap">
                        <h3>Request your demo</h3>
                        <p>
                            The best way to experience bolster is to try it for
                            yourself. We have a demo available for you to
                            roadtest. See how it can benefit your business’
                            workflow today
                        </p>
                        <FrontEndButton classes="red" to="/Request">
                            Demo request
                        </FrontEndButton>
                        <p>
                            Or call <span>0161 873 7679</span> today and we’ll
                            arrange someone to visit and demonstrate Bolster.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default ContactPage;

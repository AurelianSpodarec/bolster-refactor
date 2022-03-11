import React from 'react';
import { Link } from 'react-router-dom';

import linkedInIcon from '_content/images/icons/socials/linked-in-lightmode.svg';
import vimeoIcon from '_content/images/icons/socials/vimeo-lightmode.svg';
import instagramIcon from '_content/images/icons/socials/instagram-lightmode.svg';
import twitterIcon from '_content/images/icons/socials/twitter-lightmode.svg';

const LoggedInFooter = () => {
    return (
        <footer className="footer">
            <div className="link-wrapper">
                <p>&#169; Bolster Systems LTD</p>

                <div className="divider" />

                <Link to="/auth/terms">Terms &amp; Conditions</Link>

                <div className="divider" />

                <Link to="/">Website</Link>

                <div className="divider" />
            </div>

            <div className="social-wrapper">
                <a
                    href="https://www.linkedin.com/company/bolster-systems-limited/"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img src={linkedInIcon} alt="Linked In" />
                </a>
                <a href="https://vimeo.com/bolstersystems" target="_blank" rel="noreferrer">
                    <img src={vimeoIcon} alt="Vimeo" />
                </a>
                <a href="https://www.instagram.com/bolstersystems" target="_blank" rel="noreferrer">
                    <img src={instagramIcon} alt="Instagram" />
                </a>
                <a href="https://twitter.com/bolstersystems" target="_blank" rel="noreferrer">
                    <img src={twitterIcon} alt="Twitter" />
                </a>
            </div>
        </footer>
    );
};

export default LoggedInFooter;

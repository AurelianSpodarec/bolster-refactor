import React from 'react';
import { Link } from 'react-router-dom';

import useColourTheme from '../../../hooks/useColourTheme';

import linkedInIcon from '_content/images/icons/socials/linked-in-lightmode.svg';
import vimeoIcon from '_content/images/icons/socials/vimeo-lightmode.svg';
import instagramIcon from '_content/images/icons/socials/instagram-lightmode.svg';
import twitterIcon from '_content/images/icons/socials/twitter-lightmode.svg';
import linkedInIconDarkMode from '_content/images/icons/socials/linked-in.svg';
import vimeoIconDarkMode from '_content/images/icons/socials/vimeo.svg';
import instagramIconDarkMode from '_content/images/icons/socials/instagram.svg';
import twitterIconDarkMode from '_content/images/icons/socials/twitter.svg';

const LoggedInFooter = () => {
    const colourTheme = useColourTheme();
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
                    <img
                        src={colourTheme === 'dark' ? linkedInIconDarkMode : linkedInIcon}
                        alt="Linked In"
                    />
                </a>
                <a href="https://vimeo.com/bolstersystems" target="_blank" rel="noreferrer">
                    <img src={colourTheme === 'dark' ? vimeoIconDarkMode : vimeoIcon} alt="Vimeo" />
                </a>
                <a href="https://www.instagram.com/bolstersystems" target="_blank" rel="noreferrer">
                    <img
                        src={colourTheme === 'dark' ? instagramIconDarkMode : instagramIcon}
                        alt="Instagram"
                    />
                </a>
                <a href="https://twitter.com/bolstersystems" target="_blank" rel="noreferrer">
                    <img
                        src={colourTheme === 'dark' ? twitterIconDarkMode : twitterIcon}
                        alt="Twitter"
                    />
                </a>
            </div>
        </footer>
    );
};

export default LoggedInFooter;

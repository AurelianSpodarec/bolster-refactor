import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'components/frontEnd/shared/container/presentational/Container';
import FrontEndButton from 'components/frontEnd/shared/buttons/presentational/FrontEndButton';
import FooterLogo from '_content/images/frontend-new/footer-logo.svg';
import BackToTop from 'components/frontEnd/shared/backToTop/presentational/BackToTop';

const FrontEndFooter = () => (
    <>
        <BackToTop />
        <Container className="frontend-footer">
            <div className="frontend-footer-register">
                <FrontEndButton classes="gray" to="/register">
                    Register
                </FrontEndButton>
            </div>
            <div className="frontend-footer-logo">
                <img src={FooterLogo} alt="Footer Logo" />
            </div>
            <div className="frontend-footer-navlinks">
                <ul>
                    <li>
                        <Link to="/about-us">About us</Link>
                    </li>
                    <li>
                        <Link to="/our-system">Our system</Link>
                    </li>
                    <li>
                        <Link to="/how-it-works">How it works</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                        <Link to="/auth/register">Register</Link>
                    </li>
                </ul>
            </div>
            <div className="frontend-footer-copyright">
                Bolster is a registered trademark lore ipsum dolor sit amet Adipiscing sit amet
            </div>
        </Container>
    </>
);

export default FrontEndFooter;

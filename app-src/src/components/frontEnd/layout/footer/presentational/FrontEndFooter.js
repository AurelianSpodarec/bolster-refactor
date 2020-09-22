import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'components/frontEnd/shared/container/presentational/Container';
import FrontEndButton from 'components/frontEnd/shared/buttons/presentational/FrontEndButton';
import FooterLogo from '_content/images/frontend-new/footer-logo.svg';
import navItems from 'constants/frontEnd/navItems';

const FrontEndFooter = () => (
    <>
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
                    {navItems.map(({ name, slug }) => (
                        <li key={name}>
                            <Link to={slug}>{name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="frontend-footer-copyright">
                Bolster is a registered trademark lore ipsum dolor sit amet Adipiscing sit amet
            </div>
        </Container>
    </>
);

export default FrontEndFooter;

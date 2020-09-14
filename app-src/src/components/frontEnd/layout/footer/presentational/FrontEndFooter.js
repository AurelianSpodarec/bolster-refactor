import React from 'react';
import Container from 'components/frontEnd/shared/container/presentational/Container';
import FrontEndButton from 'components/frontEnd/shared/buttons/presentational/FrontEndButton';
import FooterLogo from '_content/images/frontend-new/footer-logo.svg';

const FrontEndFooter = () => (
    <Container className="frontend-footer">
        <div className="frontend-footer-register">
            <FrontEndButton classes="gray ">Register</FrontEndButton>
        </div>
        <img src={FooterLogo} alt="Footer Logo" />
    </Container>
);

export default FrontEndFooter;

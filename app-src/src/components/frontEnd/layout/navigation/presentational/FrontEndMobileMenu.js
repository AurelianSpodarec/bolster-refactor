import React from 'react';

import FrontEndMobileMenuItemContainer from '../containers/FrontEndMenuItemContainer';

const FrontEndMobileMenu = () => (
    <div className="frontend-menu mobile-menu">
        <div className="container">
            <i className="fa fa-bars" />
            <span>MENU</span>
            <div className="clear" />
        </div>
        <ul>
            <FrontEndMobileMenuItemContainer link="/">
                Home
            </FrontEndMobileMenuItemContainer>

            <FrontEndMobileMenuItemContainer link="/How">
                How it works
            </FrontEndMobileMenuItemContainer>

            <FrontEndMobileMenuItemContainer link="/About">
                About
            </FrontEndMobileMenuItemContainer>

            <FrontEndMobileMenuItemContainer link="/Request">
                Request demo
            </FrontEndMobileMenuItemContainer>

            <FrontEndMobileMenuItemContainer link="/Contact">
                Contact
            </FrontEndMobileMenuItemContainer>
            {/* @if (!User.Identity.IsAuthenticated) */}
            <FrontEndMobileMenuItemContainer link="/auth/Login">
                Client login
            </FrontEndMobileMenuItemContainer>

            {/* if  needs different buttons for each user type*/}

            <FrontEndMobileMenuItemContainer link="/Company">
                Dashboard
            </FrontEndMobileMenuItemContainer>

            <FrontEndMobileMenuItemContainer link="/Client ">
                Dashboard
            </FrontEndMobileMenuItemContainer>
            <FrontEndMobileMenuItemContainer link="/Client ">
                Logout
            </FrontEndMobileMenuItemContainer>
        </ul>
    </div>
);

export default FrontEndMobileMenu;

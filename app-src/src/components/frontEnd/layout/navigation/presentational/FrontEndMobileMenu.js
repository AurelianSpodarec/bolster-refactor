import React from 'react';

import FrontEndMobileMenuItemContainer from '../containers/FrontEndMenuItemContainer';

const FrontEndMobileMenu = ({
    menuOpen,
    handleLinkClick,
    logout,
    isSuperAdmin,
    isCompanyAdmin,
    isClientAccess,
    handleMenuToggle
}) => (
    <div className="frontend-menu mobile-menu">
        <div className="container" onClick={e => handleMenuToggle(e)}>
            <i className="fa fa-bars" />
            <span>MENU</span>
            <div className="clear" />
        </div>
        {menuOpen && (
            <ul>
                <FrontEndMobileMenuItemContainer
                    link="/"
                    handleClick={handleLinkClick}
                >
                    Home
                </FrontEndMobileMenuItemContainer>

                <FrontEndMobileMenuItemContainer
                    link="/How"
                    handleClick={handleLinkClick}
                >
                    How it works
                </FrontEndMobileMenuItemContainer>

                <FrontEndMobileMenuItemContainer
                    link="/About"
                    handleClick={handleLinkClick}
                >
                    About
                </FrontEndMobileMenuItemContainer>

                <FrontEndMobileMenuItemContainer
                    link="/Request"
                    handleClick={handleLinkClick}
                >
                    Request demo
                </FrontEndMobileMenuItemContainer>

                <FrontEndMobileMenuItemContainer
                    link="/Contact"
                    handleClick={handleLinkClick}
                >
                    Contact
                </FrontEndMobileMenuItemContainer>

                {isSuperAdmin || isCompanyAdmin ? (
                    <FrontEndMobileMenuItemContainer
                        link="/Company"
                        handleClick={handleLinkClick}
                    >
                        Dashboard
                    </FrontEndMobileMenuItemContainer>
                ) : (
                    ''
                )}
                {isClientAccess && (
                    <FrontEndMobileMenuItemContainer
                        link="/Client "
                        handleClick={handleLinkClick}
                    >
                        Dashboard
                    </FrontEndMobileMenuItemContainer>
                )}
                {isSuperAdmin || isClientAccess || isCompanyAdmin ? (
                    <FrontEndMobileMenuItemContainer
                        link="#"
                        handleClick={logout}
                    >
                        Logout
                    </FrontEndMobileMenuItemContainer>
                ) : (
                    <FrontEndMobileMenuItemContainer link="/auth/Login">
                        Client login
                    </FrontEndMobileMenuItemContainer>
                )}
            </ul>
        )}
    </div>
);

export default FrontEndMobileMenu;

import React from 'react';
import Logo from '_content/images/examples/logo.jpg';

const Header = () => (
    <div className="container">
        <header id="page-header">
            <div className="logo">
                <img alt="logo of" src={Logo} />
            </div>
        </header>
    </div>
);

export default Header;

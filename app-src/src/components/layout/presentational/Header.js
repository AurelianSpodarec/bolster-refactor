import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '_content/images/examples/logo.jpg';

const Header = () => (
    <header id="page-header">
        <div className="container">
            {/*** company logo ***/}
            <div className="logo">
                <Link to="/">
                    <img alt="logo of" src={Logo} />
                </Link>
            </div>

            {/*** search box ***/}
            <div className="search-area">
                <div className="generic-search">
                    <i className="search-icon far fa-search" />
                    <input type="text" placeholder="Search..." />
                </div>
            </div>
        </div>
    </header>
);

export default Header;

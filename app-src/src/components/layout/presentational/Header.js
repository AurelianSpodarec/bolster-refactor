import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '_content/images/examples/logo.jpg';

import SearchContainer from '../containers/SearchContainer';
import HeaderProfileContainer from '../containers/HeaderProfileContainer';
import HeaderNotificationsContainer from '../containers/HeaderNotificationsContainer';

const Header = ({ profile, company }) => (
    <header id="page-header">
        <div className="container">
            {/*** company logo ***/}
            <div className="logo">
                <Link to="/">
                    <img alt={`logo of ${company.name}`} src={company.logo} />
                </Link>
            </div>

            {/*** search box ***/}
            <div className="search-area">
                <SearchContainer />
            </div>

            {/*** account area ***/}
            <div className="account-area">
                {/*** notifications ***/}
                <div className="notifications">
                    <Link to="#" className="item main">
                        <i className="far fa-money-bill-alt fa-fw" />
                    </Link>
                    <HeaderNotificationsContainer />
                    <Link to="#" className="item main">
                        <i className="far fa-envelope fa-fw" />
                    </Link>
                </div>

                {/*** profile ***/}
                <HeaderProfileContainer />
            </div>

            <div className="clear" />
        </div>
    </header>
);

export default Header;

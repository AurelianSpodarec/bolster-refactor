import React from 'react';
import { Link } from 'react-router-dom';

import SearchContainer from '../containers/SearchContainer';
import HeaderProfileContainer from '../containers/HeaderProfileContainer';
import HeaderNotificationsContainer from '../containers/HeaderNotificationsContainer';

const Header = ({ profile, company, messagesLength }) => (
    <header
        id="page-header"
        style={{ borderColor: company.colorSchemeBackground }}
    >
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
                    <Link to="/credit-logs" className="item main">
                        <span className="number green">
                            {profile.creditsAvailable}
                        </span>
                        <i className="far fa-money-bill-alt fa-fw" />
                    </Link>
                    <HeaderNotificationsContainer />
                    <Link to="/message-centre" className="item main">
                        <span className="number">{messagesLength}</span>
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

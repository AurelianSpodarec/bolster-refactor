import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '_content/images/examples/logo.jpg';

import SearchContainer from '../containers/SearchContainer';
import HeaderProfileContainer from '../containers/HeaderProfileContainer';

const Header = ({ profile }) => (
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
                <SearchContainer />
            </div>

            {/*** account area ***/}
            <div className="account-area">
                {/*** notifications ***/}
                <div className="notifications">
                    <div className="item">
                        <i className="far fa-money-bill-alt fa-fw" />
                    </div>
                    <div className="item">
                        <i className="far fa-bell fa-fw" />
                    </div>
                    <div className="item">
                        <i className="far fa-envelope fa-fw" />
                    </div>

                    <div className="notification-list">
                        <div className="item">
                            <p>
                                ##CMFT / Build 1 / First Floor / Drawing PDF
                                report is ready to download
                            </p>

                            <Link to="#" className="button">
                                View
                            </Link>
                        </div>
                        <div className="item">
                            <p>
                                ##CMFT / Build 1 / First Floor / Drawing PDF
                                report is ready to download
                            </p>

                            <Link to="#" className="button">
                                View
                            </Link>
                        </div>
                        <div className="item">
                            <p>
                                ##CMFT / Build 1 / First Floor / Drawing PDF
                                report is ready to download
                            </p>

                            <Link to="#" className="button">
                                View
                            </Link>
                        </div>
                        <div className="item">
                            <Link to="#" className="button">
                                View all notifications
                            </Link>
                        </div>
                    </div>
                </div>

                {/*** profile ***/}
                <HeaderProfileContainer />
            </div>

            <div className="clear" />
        </div>
    </header>
);

export default Header;

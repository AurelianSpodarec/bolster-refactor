import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '_content/images/examples/logo.jpg';
import ProfilePic from '_content/images/examples/jamie.png';

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
                <div className="profile">
                    <div className="user">
                        <img alt="profile picture of" src={ProfilePic} />
                        <div className="text">
                            <p>##Jamie McMullan##</p>
                            <span className="email">
                                ##jamie@silverchip.com##
                            </span>
                        </div>
                        <i className="arrow fas fa-chevron-right" />
                    </div>

                    <div className="options">
                        <p className="item">Credits Available: ##5##</p>
                        <Link to="#" className="item">
                            Generation Queue: ##1##
                            <i className="icon fas fa-chevron-right" />
                        </Link>
                        <Link to="#" className="item">
                            Manage Subscription
                            <i className="icon fas fa-chevron-right" />
                        </Link>
                        <Link to="#" className="item active">
                            My Orders
                            <i className="icon fas fa-chevron-right" />
                        </Link>
                        <Link to="#" className="item">
                            My Profile
                            <i className="icon fas fa-chevron-right" />
                        </Link>
                        <Link to="#" className="item">
                            Company Settings
                            <i className="icon fas fa-chevron-right" />
                        </Link>
                        <Link to="#" className="item">
                            Logout
                            <i className="icon fas fa-sign-out" />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="clear" />
        </div>
    </header>
);

export default Header;

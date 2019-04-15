import React from 'react';
import { Link } from 'react-router-dom';

import { FILE_STORAGE_URL } from 'config';
import defaultStyles from 'constants/defaultStyles';

import SearchContainer from '../containers/SearchContainer';
import HeaderProfileContainer from '../containers/HeaderProfileContainer';
import HeaderNotificationsContainer from '../containers/HeaderNotificationsContainer';

const Header = ({
    company,
    unreadMessageCount,
    totalCredits,
    totalRequests
}) => (
    <header
        id="page-header"
        style={{ borderColor: company.colourCode || defaultStyles.colourCode }}
    >
        <div className="container">
            {/*** company logo ***/}
            <div className="logo">
                {!!company.id && (
                    <Link to="/company">
                        <img
                            alt={`logo of ${company.name}`}
                            src={
                                company.logoFile
                                    ? `${FILE_STORAGE_URL}/${company.logoFile}`
                                    : defaultStyles.logoFile
                            }
                        />
                    </Link>
                )}
            </div>

            {/*** search box ***/}
            <div className="search-area">
                <SearchContainer />
            </div>

            {/*** account area ***/}
            <div className="account-area">
                {/*** notifications ***/}
                <div className="notifications">
                    <Link to="/company/tools/credit-logs" className="item main">
                        <span className="number green">{totalCredits}</span>
                        <i className="far fa-money-bill-alt fa-fw" />
                    </Link>
                    <HeaderNotificationsContainer />
                    <Link to="/company/message-centre" className="item main">
                        {!!unreadMessageCount && (
                            <span className="number">{unreadMessageCount}</span>
                        )}
                        <i className="far fa-envelope fa-fw" />
                    </Link>
                    <Link to="/company/transfer-requests" className="item main">
                        {!!totalRequests && (
                            <span className="number">{totalRequests}</span>
                        )}
                        <i className="far fa-exchange-alt fa-fw" />
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

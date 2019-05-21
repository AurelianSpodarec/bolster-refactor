import React from 'react';
import { Link } from 'react-router-dom';

import { FILE_STORAGE_URL } from 'config';
import defaultStyles from 'constants/defaultStyles';

import SearchContainer from '../containers/SearchContainer';
import HeaderProfileContainer from '../containers/HeaderProfileContainer';
import HeaderNotificationsContainer from '../containers/HeaderNotificationsContainer';
import { PARENTAL_TYPES } from 'constants/companyAdmin/enums';

const ClientHeader = ({
    company,
    unreadMessageCount,
    totalCredits,
    totalRequests,
    showModal
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
                    <button className="item main" onClick={showModal}>
                        {company.parentalType === PARENTAL_TYPES.NONE && (
                            <span className="number green">{totalCredits}</span>
                        )}
                        <i className="far fa-money-bill-alt fa-fw" />
                    </button>
                    <HeaderNotificationsContainer />
                    {/* <Link to="/company/message-centre" className="item main">
                        {!!unreadMessageCount && (
                            <span className="number">{unreadMessageCount}</span>
                        )}
                        <i className="far fa-envelope fa-fw" />
                    </Link>
                    <Link
                        to="/company/tools/transfer-requests"
                        className="item main"
                    >
                        {!!totalRequests && (
                            <span className="number">{totalRequests}</span>
                        )}
                        <i className="far fa-exchange-alt fa-fw" />
                    </Link> */}
                    {/* Modal to select a different company */}
                    <button className="item main">
                        ##Current Company: Silverchip## ##Change Company##
                    </button>
                </div>

                {/*** profile ***/}
                <HeaderProfileContainer />
            </div>
            <div className="clear" />
        </div>
    </header>
);

export default ClientHeader;

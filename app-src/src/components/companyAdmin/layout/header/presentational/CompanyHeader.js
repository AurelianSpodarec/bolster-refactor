import React from 'react';
import { Link } from 'react-router-dom';

import { FILE_STORAGE_URL } from 'config';
import defaultStyles from 'constants/defaultStyles';

import SearchContainer from '../containers/SearchContainer';
import HeaderProfileContainer from '../containers/HeaderProfileContainer';
import HeaderNotificationsContainer from '../containers/HeaderNotificationsContainer';
import { PARENTAL_TYPES } from 'constants/companyAdmin/enums';
// import RecentUpdatesContainer from '../containers/RecentUpdatesContainer';

const Header = ({
    company,
    companyColour,
    unreadMessageCount,
    totalCredits,
    totalRequests,
    showModal,
    shouldRestrictPayments,
    isCompanySelection,
    companyUserID,
}) => (
    <header
        id="page-header"
        style={{ borderColor: companyUserID ? companyColour : defaultStyles.colourCode }}
    >
        <div className="container">
            {/*** company logo ***/}
            <div className="logo">
                {!companyUserID ? (
                    <Link to="/company">
                        <img alt="logo of Bolster Systems" src={defaultStyles.logoFile} />
                    </Link>
                ) : (
                    <>
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
                    </>
                )}
            </div>
            {!isCompanySelection && (
                <div className="search-area">
                    <SearchContainer />
                </div>
            )}

            <div className="account-area">
                {!isCompanySelection && (
                    <div className="notifications">
                        {!shouldRestrictPayments && (
                            <button className="item main" onClick={showModal}>
                                {company.parentalType === PARENTAL_TYPES.NONE && (
                                    <span className="number green">{totalCredits}</span>
                                )}
                                <i className="far fa-money-bill-alt fa-fw" />
                            </button>
                        )}
                        <HeaderNotificationsContainer />
                        <Link to="/company/message-centre" className="item main">
                            {!!unreadMessageCount && (
                                <span className="number">{unreadMessageCount}</span>
                            )}
                            <i className="far fa-envelope fa-fw" />
                        </Link>
                        <Link to="/company/tools/transfer-requests" className="item main">
                            {!!totalRequests && <span className="number">{totalRequests}</span>}
                            <i className="far fa-exchange-alt fa-fw" />
                        </Link>
                    </div>
                )}

                <HeaderProfileContainer isCompanySelection={isCompanySelection} />
            </div>
            <div className="clear" />
        </div>
    </header>
);

export default Header;

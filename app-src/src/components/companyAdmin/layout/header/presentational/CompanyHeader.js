import React from 'react';
import { Link } from 'react-router-dom';

import { FILE_STORAGE_URL } from 'config';
import defaultStyles from 'constants/defaultStyles';

import SearchContainer from '../containers/SearchContainer';
import HeaderProfileContainer from '../containers/HeaderProfileContainer';
import { PARENTAL_TYPES } from 'constants/companyAdmin/enums';
import RecentUpdatesContainer from '../containers/RecentUpdatesContainer';
import PaymentIcon from '../../../../../_content/images/icons/paymentIcon.png';
import ExchangeIcon from '../../../../../_content/images/icons/exchange.png';
import EnvelopeIcon from '../../../../../_content/images/icons/envelope.png';

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
}) => {
    return (
        <header
            id="page-header"
            style={{ borderColor: companyUserID ? companyColour : defaultStyles.colourCode }}
        >
            <div className="container">
                <div className="flex-row">
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
                            <SearchContainer placeholder="Search Sites, Drawings, Operatives" />
                        </div>
                    )}
                </div>

                <div className="account-area">
                    {!isCompanySelection && (
                        <div className="notifications">
                            <div className="credit-container">
                                {company.parentalType === PARENTAL_TYPES.NONE && (
                                    <div
                                        className={`${
                                            shouldRestrictPayments
                                                ? 'balance'
                                                : totalCredits > 0
                                                ? 'balance positive-balance'
                                                : 'balance negative-balance'
                                        }`}
                                    >
                                        {shouldRestrictPayments
                                            ? '-'
                                            : totalCredits > 999999
                                            ? '<999999'
                                            : totalCredits}
                                    </div>
                                )}
                                <div
                                    className={`${
                                        shouldRestrictPayments
                                            ? 'credit-btn'
                                            : totalCredits > 0
                                            ? 'credit-btn positive-balance'
                                            : 'credit-btn negative-balance'
                                    }`}
                                >
                                    <img alt="bank card" className="tools-icon" src={PaymentIcon} />
                                    Buy Credits
                                </div>
                            </div>

                            <Link to="/company/tools/transfer-requests" className="item">
                                {!!totalRequests && <span className="notification-dot" />}
                                <img
                                    alt="exchange icon"
                                    className="tools-icon"
                                    src={ExchangeIcon}
                                />
                            </Link>

                            <Link to="/company/message-centre" className="item">
                                {!!unreadMessageCount && <span className="notification-dot" />}
                                <img alt="envelope" className="tools-icon" src={EnvelopeIcon} />
                            </Link>
                            <div className="break-line" />
                            <HeaderProfileContainer isCompanySelection={isCompanySelection} />
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;

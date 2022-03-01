import React from 'react';
import { Link } from 'react-router-dom';

import { FILE_STORAGE_URL } from 'config';
import defaultStyles from 'constants/defaultStyles';

import SearchContainer from '../containers/SearchContainer';
import HeaderProfileContainer from '../containers/HeaderProfileContainer';
import ExchangeIcon from '../../../../../_content/images/icons/exchange.png';
import EnvelopeIcon from '../../../../../_content/images/icons/envelope.png';
import CreditsButton from 'components/shared/generic/button/presentational/CreditsButton';
import CircleButton from 'components/shared/generic/button/presentational/CircleButton';

const Header = ({
    company,
    companyColour,
    unreadMessageCount,
    totalRequests,
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
                            <CreditsButton />
                            <CircleButton icon={ExchangeIcon} showNotification={!!totalRequests} />
                            <CircleButton
                                icon={EnvelopeIcon}
                                showNotification={!!unreadMessageCount}
                            />

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

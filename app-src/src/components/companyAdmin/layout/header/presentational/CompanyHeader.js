import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import { FILE_STORAGE_URL } from 'config';
import defaultStyles from 'constants/defaultStyles';

import useCompanyHeader from '../hooks/useCompanyHeader';

import SearchContainer from '../containers/SearchContainer';
import HeaderProfileContainer from '../containers/HeaderProfileContainer';
import ExchangeIcon from '../../../../../_content/images/icons/exchange.png';
import EnvelopeIcon from '../../../../../_content/images/icons/envelope.png';
import CircleButton from 'components/shared/generic/button/presentational/CircleButton';
import CreditsButton from 'components/companyAdmin/generic/button/CreditsButton';

const Header = () => {
    const {
        company,
        companyColour,
        companyUserID,
        isCompanySelection,
        totalRequests,
        unreadMessageCount,
    } = useCompanyHeader();

    return (
        <header
            id="page-header"
            className="flex-row justify-between align-stretch"
            style={{ borderColor: companyUserID ? companyColour : defaultStyles.colourCode }}
        >
            <div className="logo-search-area flex-row align-center">
                <div className="logo flex-row justify-center align-center">
                    {!companyUserID ? (
                        <Link to="/company">
                            <img alt="logo of Bolster Systems" src={defaultStyles.logoFile} />
                        </Link>
                    ) : (
                        <>
                            {!!company?.id && (
                                <Link to="/company">
                                    <img
                                        alt={`logo of ${company?.name}`}
                                        src={
                                            company?.logoFile
                                                ? `${FILE_STORAGE_URL}/${company?.logoFile}`
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

            <div className="account-area flex-row">
                {!isCompanySelection && (
                    <div className="notifications">
                        <CreditsButton />
                        <CircleButton
                            href="/company/tools/transfer-requests"
                            icon={ExchangeIcon}
                            showNotification={!!totalRequests}
                        />
                        <CircleButton
                            href="/company/message-centre"
                            icon={EnvelopeIcon}
                            showNotification={!!unreadMessageCount}
                        />

                        <div className="break-line" />
                        <HeaderProfileContainer isCompanySelection={isCompanySelection} />
                    </div>
                )}
            </div>
        </header>
    );
};

export default withRouter(Header);

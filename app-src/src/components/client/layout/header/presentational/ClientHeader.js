import React from 'react';
import { Link } from 'react-router-dom';

import { FILE_STORAGE_URL } from 'config';
import defaultStyles from 'constants/defaultStyles';

import SearchContainer from '../containers/SearchContainer';

import HeaderProfile from 'components/companyAdmin/layout/header/presentational/HeaderProfile';
import useCompanyHeader from 'components/companyAdmin/layout/header/hooks/useCompanyHeader';
import CreditsButton from 'components/companyAdmin/generic/button/CreditsButton';
import CircleButton from 'components/shared/generic/button/presentational/CircleButton';
import ExchangeIcon from '../../../../../_content/images/icons/exchange.png';
import EnvelopeIcon from '../../../../../_content/images/icons/envelope.png';

const ClientHeader = ({ company, isCompanySelected }) => {
    const { companyColour, companyUserID } = useCompanyHeader();

    return (
        <header
            id="page-header"
            className="flex-row justify-between align-stretch"
            style={{ borderColor: companyUserID ? companyColour : defaultStyles.colourCode }}
        >
            <div className="flex flex-row align-stretch">
                <div className="logo flex-row justify-center align-center">
                    <Link to="/company">
                        <img
                            alt={
                                isCompanySelected
                                    ? `logo of ${company.name}`
                                    : 'logo of Bolster Systems'
                            }
                            src={
                                isCompanySelected && company.logoFile
                                    ? `${FILE_STORAGE_URL}/${company.logoFile}`
                                    : defaultStyles.logoFile
                            }
                        />
                    </Link>
                </div>

                <div className="flex flex-row align-center">
                    <div className="search-area">
                        <SearchContainer />
                    </div>
                </div>

                <div className="account-area flex-row">
                    <div className="notifications flex-row align-center">
                        <HeaderProfile />
                    </div>
                </div>
                <div className="clear" />
            </div>
        </header>
    );
};

export default ClientHeader;

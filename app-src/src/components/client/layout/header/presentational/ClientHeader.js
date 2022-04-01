import React from 'react';
import { Link } from 'react-router-dom';

import { FILE_STORAGE_URL } from 'config';
import defaultStyles from 'constants/defaultStyles';

import SearchContainer from '../containers/SearchContainer';

import HeaderProfile from 'components/companyAdmin/layout/header/presentational/HeaderProfile';
import useCompanyHeader from 'components/companyAdmin/layout/header/hooks/useCompanyHeader';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsMobile } from 'selectors/shared/mobile';
import { toggleMobileMenu as toggleMobileMenuAction } from 'actions/shared/mobile/sync/toggleMobileMenu';

const ClientHeader = ({ company, isCompanySelected }) => {
    const dispatch = useDispatch();
    const { companyColour, companyUserID } = useCompanyHeader();
    const isMobile = useSelector(selectIsMobile);

    const toggleMobileMenu = () => {
        dispatch(toggleMobileMenuAction());
    };

    return (
        <header
            id="page-header"
            className="flex-row justify-between align-stretch"
            style={{ borderColor: companyUserID ? companyColour : defaultStyles.colourCode }}
        >
            <div className="flex flex-row align-stretch">
                <div className="logo flex-row justify-center align-center">
                    {isMobile && (
                        <div className="mobile-menu" onClick={() => toggleMobileMenu()}>
                            <i className="far fa-bars" />
                        </div>
                    )}
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

                {!isMobile && (
                    <div className="flex flex-row align-center">
                        <div className="search-area">
                            <SearchContainer className="header-nav" />
                        </div>
                    </div>
                )}
            </div>

            <div className="account-area flex-row">
                <div className="notifications flex-row align-center">
                    <HeaderProfile isClient />
                </div>
            </div>
            <div className="clear" />
        </header>
    );
};

export default ClientHeader;

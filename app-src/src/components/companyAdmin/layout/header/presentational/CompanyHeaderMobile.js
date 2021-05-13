import React from 'react';
import { Link } from 'react-router-dom';

import { FILE_STORAGE_URL } from 'config';
import defaultStyles from 'constants/defaultStyles';

import HeaderProfileContainer from '../containers/HeaderProfileContainer';

const CompanyHeaderMobile = ({
    company,
    companyColour,
    unreadMessageCount,
    totalCredits,
    totalRequests,
    showModal,
    toggleMobileMenu,
    isCompanySelection,
    companyUserID,
}) => (
    <header
        id="page-header"
        style={{ borderColor: companyUserID ? companyColour : defaultStyles.colourCode }}
    >
        <div className="container">
            <div className="mobile-menu" onClick={() => toggleMobileMenu()}>
                <i className="far fa-bars" />
            </div>
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

            {/*** profile ***/}
            <HeaderProfileContainer
                company={company}
                unreadMessageCount={unreadMessageCount}
                totalCredits={totalCredits}
                totalRequests={totalRequests}
                showModal={showModal}
                isCompanySelection={isCompanySelection}
            />

            <div className="clear" />
        </div>
    </header>
);

export default CompanyHeaderMobile;

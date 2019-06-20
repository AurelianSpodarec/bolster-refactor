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
    showModal
}) => (
    <header id="page-header" style={{ borderColor: companyColour }}>
        <div className="container">
            <div className="mobile-menu">
                <i className="far fa-bars" />
            </div>
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

            {/*** profile ***/}
            <HeaderProfileContainer
                company={company}
                unreadMessageCount={unreadMessageCount}
                totalCredits={totalCredits}
                totalRequests={totalRequests}
                showModal={showModal}
            />

            <div className="clear" />
        </div>
    </header>
);

export default CompanyHeaderMobile;

import React from 'react';
import { Link } from 'react-router-dom';

import { FILE_STORAGE_URL } from 'config';
import defaultStyles from 'constants/defaultStyles';

import SearchContainer from '../containers/SearchContainer';
import HeaderProfileContainer from '../containers/HeaderProfileContainer';
// import HeaderNotificationsContainer from '../containers/HeaderNotificationsContainer';
// import { PARENTAL_TYPES } from 'constants/companyAdmin/enums';

const ClientHeader = ({ company }) => (
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
                    {/* Modal to select a different company */}
                    <button className="item main large">
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

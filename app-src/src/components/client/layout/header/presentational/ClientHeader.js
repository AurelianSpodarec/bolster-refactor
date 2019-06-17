import React from 'react';
import { Link } from 'react-router-dom';

import { FILE_STORAGE_URL } from 'config';
import defaultStyles from 'constants/defaultStyles';

import SearchContainer from '../containers/SearchContainer';
import HeaderProfileContainer from '../containers/HeaderProfileContainer';
import { getBolsterColour } from 'helpers/generic';
// import HeaderNotificationsContainer from '../containers/HeaderNotificationsContainer';
// import { PARENTAL_TYPES } from 'constants/companyAdmin/enums';

const ClientHeader = ({ company, isCompanySelected }) => (
    <header
        id="page-header"
        style={{ borderColor: company.colourCode || getBolsterColour() }}
    >
        <div className="container">
            <div className="logo">
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

            <div className="search-area">
                <SearchContainer />
            </div>

            <div className="account-area">
                <div className="notifications">
                    {/* <button className="item main large">
                        ##Current Company: Silverchip## ##Change Company##
                    </button> */}
                </div>

                <HeaderProfileContainer />
            </div>
            <div className="clear" />
        </div>
    </header>
);

export default ClientHeader;

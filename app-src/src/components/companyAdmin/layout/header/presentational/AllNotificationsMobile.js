import React from 'react';
import { Link } from 'react-router-dom';

import { PARENTAL_TYPES } from 'constants/companyAdmin/enums';
import HeaderNotificationsContainer from '../containers/HeaderNotificationsContainer';

const AllNotificationsMobile = ({
    company,
    unreadMessageCount,
    totalCredits,
    totalRequests,
    showModal
}) => (
    <div className="account-area">
        {/*** notifications ***/}
        <div className="notifications">
            <button className="item main" onClick={showModal}>
                {company.parentalType === PARENTAL_TYPES.NONE && (
                    <span className="number green">{totalCredits}</span>
                )}
                <i className="far fa-money-bill-alt fa-fw" />
            </button>
            <HeaderNotificationsContainer />
            <Link to="/company/message-centre" className="item main">
                {!!unreadMessageCount && (
                    <span className="number">{unreadMessageCount}</span>
                )}
                <i className="far fa-envelope fa-fw" />
            </Link>
            <Link to="/company/tools/transfer-requests" className="item main">
                {!!totalRequests && (
                    <span className="number">{totalRequests}</span>
                )}
                <i className="far fa-exchange-alt fa-fw" />
            </Link>
        </div>
    </div>
);

export default AllNotificationsMobile;

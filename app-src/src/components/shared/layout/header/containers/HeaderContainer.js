import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BasicHeader from '../presentational/BasicHeader';
import Header from '../presentational/Header';
import { MESSAGE_TYPES } from 'constants/companyAdmin/enums';

const HeaderContainer = ({
    profile,
    company,
    unreadMessageCount,
    totalCedits,
    curUrl
}) => {
    const basicHeaderUrls = ['/auth'];
    if (basicHeaderUrls.some(url => curUrl.startsWith(url.toLowerCase()))) {
        return <BasicHeader />;
    }

    return (
        <Header
            profile={profile}
            company={company}
            unreadMessageCount={unreadMessageCount}
            totalCedits={totalCedits}
        />
    );
};

const mapStateToProps = (
    {
        companyAdmin: {
            companiesReducer: { company },
            messagesReducer: { messages },
            creditLogsReducer: { creditLogs }
        },
        shared: {
            profileReducer: { profile }
        }
    },
    { location: { pathname } }
) => {
    const unreadMessageCount = Object.values(messages).filter(
        ({ type, isRead }) => type === MESSAGE_TYPES.SYSTEM && !isRead
    ).length;
    const totalCedits = Object.values(creditLogs).reduce(
        (a, b) => a + b.quantity,
        0
    );

    return {
        profile: profile,
        company,
        unreadMessageCount,
        totalCedits,
        curUrl: pathname.toLowerCase()
    };
};
const WithConnect = connect(mapStateToProps)(HeaderContainer);

export default withRouter(WithConnect);

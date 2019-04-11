import React from 'react';
import { connect } from 'react-redux';

import CompanyHeader from '../presentational/CompanyHeader';
import { MESSAGE_TYPES } from 'constants/companyAdmin/enums';

const CompanyHeaderContainer = ({
    profile,
    company,
    unreadMessageCount,
    totalCedits
}) => {
    return (
        <CompanyHeader
            profile={profile}
            company={company}
            unreadMessageCount={unreadMessageCount}
            totalCedits={totalCedits}
        />
    );
};

const mapStateToProps = ({
    companyAdmin: {
        // companiesReducer: { company },
        messagesReducer: { messages },
        creditLogsReducer: { creditLogs }
    },
    shared: {
        profileReducer: { profile }
    }
}) => {
    const unreadMessageCount = Object.values(messages).filter(
        ({ type, isRead }) => type === MESSAGE_TYPES.SYSTEM && !isRead
    ).length;
    const totalCedits = Object.values(creditLogs).reduce(
        (a, b) => a + b.quantity,
        0
    );

    return {
        profile: profile,
        // company,
        unreadMessageCount,
        totalCedits
    };
};
export default connect(mapStateToProps)(CompanyHeaderContainer);

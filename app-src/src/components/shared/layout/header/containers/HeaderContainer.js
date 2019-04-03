import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BasicHeader from '../presentational/BasicHeader';
import Header from '../presentational/Header';

const HeaderContainer = ({ profile, company, messageCount, curUrl }) => {
    const basicHeaderUrls = ['/auth'];
    if (basicHeaderUrls.some(url => curUrl.startsWith(url.toLowerCase()))) {
        return <BasicHeader />;
    }

    return (
        <Header
            profile={profile}
            company={company}
            messageCount={messageCount}
        />
    );
};

const mapStateToProps = (
    {
        companyAdmin: { companiesReducer, messagesReducer },
        shared: { profileReducer }
    },
    { location: { pathname } }
) => ({
    profile: profileReducer.profile,
    company: companiesReducer.company,
    messageCount: Object.values(messagesReducer.messages).length,
    curUrl: pathname.toLowerCase()
});
const WithConnect = connect(mapStateToProps)(HeaderContainer);

export default withRouter(WithConnect);

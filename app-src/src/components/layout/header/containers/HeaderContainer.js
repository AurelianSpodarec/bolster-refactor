import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../presentational/Header';

class HeaderContainer extends Component {
    render() {
        const { props } = this;

        return (
            <Header
                profile={props.profile}
                company={props.company}
                messageCount={props.messageCount}
            />
        );
    }
}

const mapStateToProps = ({
    profileReducers,
    companyReducers,
    messagesReducer
}) => ({
    profile: profileReducers.profile.profile,
    company: companyReducers.company.company,
    messageCount: Object.values(messagesReducer.messages).length
});

export default connect(mapStateToProps)(HeaderContainer);

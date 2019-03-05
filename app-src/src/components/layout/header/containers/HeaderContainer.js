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
    messagesReducers
}) => ({
    profile: profileReducers.profile.profile,
    company: companyReducers.company.company,
    messageCount: messagesReducers.messages.messages.length
});

export default connect(mapStateToProps)(HeaderContainer);

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
    profileReducer,
    companyReducer,
    messagesReducer
}) => ({
    profile: profileReducer.profile,
    company: companyReducer.company,
    messageCount: Object.values(messagesReducer.messages).length
});

export default connect(mapStateToProps)(HeaderContainer);

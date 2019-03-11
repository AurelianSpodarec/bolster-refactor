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
    companiesReducer,
    messagesReducer
}) => ({
    profile: profileReducer.profile,
    company: companiesReducer.company,
    messageCount: Object.values(messagesReducer.messages).length
});

export default connect(mapStateToProps)(HeaderContainer);

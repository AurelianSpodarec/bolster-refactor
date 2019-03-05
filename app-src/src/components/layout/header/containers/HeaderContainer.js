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
                messagesLength={props.messagesLength}
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
    messagesLength: messagesReducers.messages.messagesLength
});

export default connect(mapStateToProps)(HeaderContainer);

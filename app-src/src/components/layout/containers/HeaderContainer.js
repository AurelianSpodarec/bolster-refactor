import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../presentational/Header';

class HeaderContainer extends Component {
    render() {
        const { props } = this;

        return <Header profile={props.profile} />;
    }
}

export default connect(state => state.profileReducers.profile)(HeaderContainer);

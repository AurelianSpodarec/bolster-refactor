import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../presentational/Header';

class HeaderContainer extends Component {
    render() {
        return <Header />;
    }
}

export default connect()(HeaderContainer);

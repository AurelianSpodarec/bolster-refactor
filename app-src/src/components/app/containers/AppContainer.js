import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchProfile from 'actions/profile/async/fetchProfile';

import App from '../presentational/App';

class AppContainer extends Component {
    render() {
        return <App />;
    }

    componentDidMount = () => {
        this.props.dispatch(fetchProfile());
    };
}

export default connect()(AppContainer);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchProfile from 'actions/profile/async/fetchProfile';
import fetchCompany from 'actions/company/async/fetchCompany';
import fetchNotifications from 'actions/notifications/async/fetchNotifications';

import App from '../presentational/App';

class AppContainer extends Component {
    render() {
        return <App />;
    }

    componentDidMount = () => {
        this.props.dispatch(fetchProfile());
        this.props.dispatch(fetchCompany());
        this.props.dispatch(fetchNotifications());
    };
}

export default connect()(AppContainer);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchProfile from 'actions/profile/async/fetchProfile';
import fetchCompany from 'actions/company/async/fetchCompany';
import fetchNotifications from 'actions/notifications/async/fetchNotifications';
import fetchMessages from 'actions/messages/async/fetchMessages';
import fetchGenerationQueue from 'actions/generationQueue/async/fetchGenerationQueue';

import App from '../presentational/App';

class AppContainer extends Component {
    render() {
        return <App />;
    }

    componentDidMount = () => {
        this.props.dispatch(fetchProfile());
        this.props.dispatch(fetchCompany());
        this.props.dispatch(fetchNotifications());
        this.props.dispatch(fetchMessages());
        this.props.dispatch(fetchGenerationQueue());
    };
}

export default connect()(AppContainer);

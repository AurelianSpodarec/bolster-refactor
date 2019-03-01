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
        const {
            fetchProfile,
            fetchCompany,
            fetchNotifications,
            fetchMessages,
            fetchGenerationQueue
        } = this.props;

        fetchProfile();
        fetchCompany();
        fetchNotifications();
        fetchMessages();
        fetchGenerationQueue();
    };
}

const mapDispatchToProps = dispatch => ({
    fetchProfile: () => {
        dispatch(fetchProfile());
    },
    fetchCompany: () => {
        dispatch(fetchCompany());
    },
    fetchNotifications: () => {
        dispatch(fetchNotifications());
    },
    fetchMessages: () => {
        dispatch(fetchMessages());
    },
    fetchGenerationQueue: () => {
        dispatch(fetchGenerationQueue());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(AppContainer);

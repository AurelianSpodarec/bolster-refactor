import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import fetchProfile from 'actions/profile/async/fetchProfile';
import fetchSingleCompany from 'actions/companies/async/fetchSingleCompany';
import fetchNotifications from 'actions/notifications/async/fetchNotifications';
import fetchMessages from 'actions/messages/async/fetchMessages';
import fetchGenerationQueue from 'actions/generationQueue/async/fetchGenerationQueue';

import App from '../presentational/App';

class AppContainer extends Component {
    componentDidMount() {
        this.props.fetchHomeData();
    }

    render() {
        return (
            <Router>
                <App />
            </Router>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchHomeData: () => {
        dispatch(fetchProfile());
        dispatch(fetchSingleCompany());
        dispatch(fetchNotifications());
        dispatch(fetchMessages());
        dispatch(fetchGenerationQueue());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(AppContainer);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchSites from 'actions/sites/async/fetchSites';

import SitesList from '../presentational/SitesList';

class SitesListContainer extends Component {
    render() {
        return <SitesList />;
    }

    componentDidMount = () => {
        this.props.dispatch(fetchSites());
    };
}

export default connect()(SitesListContainer);

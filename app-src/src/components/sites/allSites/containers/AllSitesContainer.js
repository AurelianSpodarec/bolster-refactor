import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchSites from 'actions/sites/async/fetchAllSites';

import AllSites from '../presentational/AllSites';

class AllSitesContainer extends Component {
    render() {
        return <AllSites />;
    }

    componentDidMount = () => {
        this.props.dispatch(fetchSites());
    };
}

export default connect()(AllSitesContainer);

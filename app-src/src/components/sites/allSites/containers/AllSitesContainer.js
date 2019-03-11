import React, { Component } from 'react';
import { connect } from 'react-redux';

import setBreadcrumbs from 'actions/generic/breadcrumbs/sync/setBreadcrumbs';
import fetchSites from 'actions/sites/async/fetchAllSites';

import AllSites from '../presentational/AllSites';

class AllSitesContainer extends Component {
    render() {
        return <AllSites />;
    }

    componentDidMount = () => {
        const { setBreadcrumbs, fetchSites } = this.props;
        setBreadcrumbs([{ text: 'Sites' }]);
        fetchSites();
    };
}

export default connect(
    null,
    dispatch => ({
        setBreadcrumbs: breadcrumbs => {
            dispatch(setBreadcrumbs(breadcrumbs));
        },
        fetchSites: () => {
            dispatch(fetchSites());
        }
    })
)(AllSitesContainer);

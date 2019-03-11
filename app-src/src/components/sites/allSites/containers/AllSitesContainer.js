import React, { Component } from 'react';
import { connect } from 'react-redux';

import setBreadcrumbs from 'actions/generic/breadcrumbs/sync/setBreadcrumbs';
import fetchSites from 'actions/sites/async/fetchAllSites';
import fetchAllBuildings from 'actions/buildings/async/fetchAllBuildings';
import fetchAllFloors from 'actions/floors/async/fetchAllFloors';

import AllSites from '../presentational/AllSites';

class AllSitesContainer extends Component {
    render() {
        return <AllSites />;
    }

    componentDidMount = () => {
        const {
            setBreadcrumbs,
            fetchSites,
            fetchAllBuildings,
            fetchAllFloors
        } = this.props;
        setBreadcrumbs([{ text: 'Sites' }]);
        fetchSites();
        fetchAllBuildings();
        fetchAllFloors();
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
        },
        fetchAllBuildings: () => {
            dispatch(fetchAllBuildings());
        },
        fetchAllFloors: () => {
            dispatch(fetchAllFloors());
        }
    })
)(AllSitesContainer);

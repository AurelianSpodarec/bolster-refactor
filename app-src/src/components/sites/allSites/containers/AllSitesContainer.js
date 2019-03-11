import React, { Component } from 'react';
import { connect } from 'react-redux';

import setBreadcrumbs from 'actions/generic/breadcrumbs/sync/setBreadcrumbs';
import fetchSites from 'actions/sites/async/fetchAllSites';
import fetchAllBuildings from 'actions/buildings/async/fetchAllBuildings';
import fetchAllFloors from 'actions/floors/async/fetchAllFloors';
import fetchAllDrawings from 'actions/drawings/async/fetchAllDrawings';

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
            fetchAllFloors,
            fetchAllDrawings
        } = this.props;
        setBreadcrumbs([{ text: 'Sites' }]);
        fetchSites();
        fetchAllBuildings();
        fetchAllFloors();
        fetchAllDrawings();
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
        },
        fetchAllDrawings: () => {
            dispatch(fetchAllDrawings());
        },
    })
)(AllSitesContainer);

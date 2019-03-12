import React, { Component } from 'react';
import { connect } from 'react-redux';

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
            fetchSites,
            fetchAllBuildings,
            fetchAllFloors,
            fetchAllDrawings
        } = this.props;
        fetchSites();
        fetchAllBuildings();
        fetchAllFloors();
        fetchAllDrawings();
    };
}

export default connect(
    null,
    dispatch => ({
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
        }
    })
)(AllSitesContainer);

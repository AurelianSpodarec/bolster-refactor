import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchAllSites from 'actions/companyAdmin/sites/async/fetchAllSites';
import fetchAllBuildings from 'actions/companyAdmin/buildings/async/fetchAllBuildings';
import fetchAllFloors from 'actions/companyAdmin/floors/async/fetchAllFloors';
import fetchAllDrawings from 'actions/companyAdmin/drawings/async/fetchAllDrawings';

import AllSites from '../presentational/AllSites';

class AllSitesContainer extends Component {
    render() {
        return <AllSites />;
    }

    componentDidMount = () => {
        const {
            fetchAllSites,
            fetchAllBuildings,
            fetchAllFloors,
            fetchAllDrawings
        } = this.props;
        fetchAllSites();
        fetchAllBuildings();
        fetchAllFloors();
        fetchAllDrawings();
    };
}

export default connect(
    null,
    dispatch => ({
        fetchAllSites: () => {
            dispatch(fetchAllSites());
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

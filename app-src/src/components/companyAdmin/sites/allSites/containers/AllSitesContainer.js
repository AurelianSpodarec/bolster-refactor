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
        const { fetchAllLevels } = this.props;
        fetchAllLevels();
    };
}

export default connect(
    null,
    dispatch => ({
        fetchAllLevels: () => {
            dispatch(fetchAllSites());
            dispatch(fetchAllBuildings());
            dispatch(fetchAllFloors());
            dispatch(fetchAllDrawings());
        }
    })
)(AllSitesContainer);

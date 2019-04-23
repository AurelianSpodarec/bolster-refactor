import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchAllSites from 'actions/companyAdmin/sites/async/fetchAllSites';
import fetchAllBuildings from 'actions/companyAdmin/buildings/async/fetchAllBuildings';
import fetchAllFloors from 'actions/companyAdmin/floors/async/fetchAllFloors';
import fetchAllDrawings from 'actions/companyAdmin/drawings/async/fetchAllDrawings';

import PinFilters from '../presentational/PinFilters';

export class PinFiltersContainer extends Component {
    render() {
        return <PinFilters />;
    }

    componentDidMount = () => {
        const { fetchAllLevels } = this.props;

        fetchAllLevels();
    };
}

const mapDispatchToProps = dispatch => ({
    fetchAllLevels: () => {
        dispatch(fetchAllSites());
        dispatch(fetchAllBuildings());
        dispatch(fetchAllFloors());
        dispatch(fetchAllDrawings());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(PinFiltersContainer);

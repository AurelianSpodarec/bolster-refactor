import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import fetchAllBuildings from 'actions/buildings/async/fetchAllBuildings';

import BuildingsTable from '../presentational/BuildingsTable';

class BuildingsTableContainer extends Component {
    render() {
        const { buildings, isFetching, error } = this.props;
        const tableHeaders = ['Building name', 'Premissions', 'Action'];

        return (
            <BuildingsTable
                headers={tableHeaders}
                buildings={buildings}
                isFetching={isFetching}
                error={error}
            />
        );
    }
}

const mapStateToProps = ({ buildingsReducers }) => ({
    buildings: Object.values(buildingsReducers.buildings.buildings),
    isFetching: buildingsReducers.buildings.isFetching,
    error: buildingsReducers.buildings.error,
    searchTerm: buildingsReducers.buildingsFilters.searchTerm,
    status: buildingsReducers.buildingsFilters.status
});

export default connect(
    mapStateToProps,
    null
)(BuildingsTableContainer);

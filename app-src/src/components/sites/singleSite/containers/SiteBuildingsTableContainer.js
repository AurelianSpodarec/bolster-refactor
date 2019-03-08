import React, { Component } from 'react';
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

    componentDidMount = () => {
        this.props.fetchAllBuildings();
    };
}

const mapStateToProps = ({ buildingsReducers }) => ({
    buildings: Object.values(buildingsReducers.buildings.buildings),
    isFetching: buildingsReducers.buildings.isFetching,
    error: buildingsReducers.buildings.error,
    searchTerm: buildingsReducers.buildingsFilters.searchTerm,
    status: buildingsReducers.buildingsFilters.status
});

const mapDispatchToProps = dispatch => ({
    fetchAllBuildings: () => {
        dispatch(fetchAllBuildings());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BuildingsTableContainer);

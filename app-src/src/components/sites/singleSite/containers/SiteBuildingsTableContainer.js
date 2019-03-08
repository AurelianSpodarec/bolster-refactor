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

const mapStateToProps = ({ buildingsReducer }) => ({
    buildings: Object.values(buildingsReducer.buildings),
    isFetching: buildingsReducer.isFetching,
    error: buildingsReducer.error,
    nameFilter: buildingsReducer.nameFilter,
    statusFilter: buildingsReducer.statusFilter
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

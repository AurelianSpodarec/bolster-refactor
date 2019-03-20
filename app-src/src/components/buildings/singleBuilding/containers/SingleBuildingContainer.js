import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchSingleBuilding from 'actions/buildings/async/fetchSingleBuilding';
import fetchDocuments from 'actions/documents/async/fetchDocuments';
import fetchClients from 'actions/clients/async/fetchClients';
import fetchCompanies from 'actions/companies/async/fetchCompanies';
import fetchOperatives from 'actions/operatives/async/fetchOperatives';
import fetchAllFloors from 'actions/floors/async/fetchAllFloors';
import fetchAllDrawings from 'actions/drawings/async/fetchAllDrawings';

import SingleBuilding from '../presentational/SingleBuilding';

class SingleBuildingContainer extends Component {
    render() {
        return <SingleBuilding />;
    }

    componentDidMount = () => {
        const {
            fetchSingleBuilding,
            fetchAllDrawings,
            fetchAllFloors,
            buildingID
        } = this.props;

        fetchSingleBuilding(buildingID);
        fetchAllDrawings();
        fetchAllFloors();
        // fetchDocuments();
        // fetchClients();
        // fetchCompanies();
        // fetchOperatives();
    };
}

const mapDispatchToProps = dispatch => ({
    fetchSingleBuilding: buildingID => {
        dispatch(fetchSingleBuilding(buildingID));
    },
    fetchAllDrawings: () => {
        dispatch(fetchAllDrawings());
    },
    fetchAllFloors: () => {
        dispatch(fetchAllFloors());
    },
    fetchDocuments: () => {
        dispatch(fetchDocuments());
    },
    fetchClients: () => {
        dispatch(fetchClients());
    },
    fetchCompanies: () => {
        dispatch(fetchCompanies());
    },
    fetchOperatives: () => {
        dispatch(fetchOperatives());
    }
});

export default connect(
    (_, { match }) => ({ buildingID: match.params['id'] }),
    mapDispatchToProps
)(SingleBuildingContainer);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchSingleBuilding from 'actions/companyAdmin/buildings/async/fetchSingleBuilding';
import fetchDocuments from 'actions/companyAdmin/documents/async/fetchDocuments';
import fetchClients from 'actions/companyAdmin/clients/async/fetchClients';
import fetchAllCompanies from 'actions/companyAdmin/companies/async/fetchAllCompanies';
import fetchOperatives from 'actions/companyAdmin/operatives/async/fetchOperatives';
import fetchAllFloors from 'actions/companyAdmin/floors/async/fetchAllFloors';
import fetchAllDrawings from 'actions/companyAdmin/drawings/async/fetchAllDrawings';

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
            fetchAllCompanies,
            // fetchDocuments,
            buildingID
        } = this.props;

        fetchSingleBuilding(buildingID);
        fetchAllDrawings();
        fetchAllFloors();
        fetchAllCompanies();
        fetchDocuments('building', buildingID);

        // fetchClients();
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
    fetchDocuments: (HierarchyType, buildingID) => {
        dispatch(fetchDocuments(HierarchyType, buildingID));
    },
    fetchClients: () => {
        dispatch(fetchClients());
    },
    fetchAllCompanies: () => {
        dispatch(fetchAllCompanies());
    },
    fetchOperatives: () => {
        dispatch(fetchOperatives());
    }
});

export default connect(
    (_, { match }) => ({ buildingID: match.params['id'] }),
    mapDispatchToProps
)(SingleBuildingContainer);

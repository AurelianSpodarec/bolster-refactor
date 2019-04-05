import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchSingleBuilding from 'actions/companyAdmin/buildings/async/fetchSingleBuilding';
import fetchDocuments from 'actions/companyAdmin/documents/async/fetchDocuments';
import fetchAllCompanies from 'actions/companyAdmin/companies/async/fetchAllCompanies';
import fetchAllFloors from 'actions/companyAdmin/floors/async/fetchAllFloors';
import fetchAllDrawings from 'actions/companyAdmin/drawings/async/fetchAllDrawings';
import fetchPinStatsForLevel from 'actions/companyAdmin/stats/async/fetchPinStatsForLevel';

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
            fetchDocuments,
            buildingID,
            fetchPinStatsForLevel
        } = this.props;

        fetchSingleBuilding(buildingID).then(() => {
            fetchPinStatsForLevel('building', buildingID);
            fetchAllDrawings();
            fetchAllFloors();
            fetchAllCompanies();
            fetchDocuments('building', buildingID);
        });
    };
}

const mapDispatchToProps = dispatch => ({
    fetchSingleBuilding: buildingID => {
        return dispatch(fetchSingleBuilding(buildingID));
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
    fetchAllCompanies: () => {
        dispatch(fetchAllCompanies());
    },
    fetchPinStatsForLevel: (hierarchyType, levelID) => {
        dispatch(fetchPinStatsForLevel(hierarchyType, levelID));
    }
});

export default connect(
    (_, { match }) => ({ buildingID: match.params['id'] }),
    mapDispatchToProps
)(SingleBuildingContainer);

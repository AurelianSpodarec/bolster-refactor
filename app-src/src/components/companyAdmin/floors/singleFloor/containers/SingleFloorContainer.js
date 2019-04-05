import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchSingleFloor from 'actions/companyAdmin/floors/async/fetchSingleFloor';
import fetchAllDrawings from 'actions/companyAdmin/drawings/async/fetchAllDrawings';
import fetchDocuments from 'actions/companyAdmin/documents/async/fetchDocuments';
import fetchClients from 'actions/companyAdmin/clients/async/fetchClients';
import fetchAllCompanies from 'actions/companyAdmin/companies/async/fetchAllCompanies';
import fetchPinStatsForLevel from 'actions/companyAdmin/stats/async/fetchPinStatsForLevel';

import SingleFloor from '../presentational/SingleFloor';

class SingleFloorContainer extends Component {
    render() {
        return <SingleFloor />;
    }

    componentDidMount = () => {
        const {
            floorID,
            fetchSingleFloor,
            fetchAllDrawings,
            fetchDocuments,
            // fetchClients,
            fetchAllCompanies,
            fetchPinStatsForLevel
        } = this.props;

        fetchSingleFloor(floorID);
        fetchAllDrawings();
        fetchDocuments('floor', floorID);
        fetchPinStatsForLevel('floor', floorID);
        // fetch Clients hooked up to mock data
        // fetchClients();
        fetchAllCompanies();
    };
}

const mapStateToProps = (_, { match }) => ({
    floorID: match.params['id']
});

const mapDispatchToProps = dispatch => ({
    fetchSingleFloor: id => {
        dispatch(fetchSingleFloor(id));
    },
    fetchAllDrawings: () => {
        dispatch(fetchAllDrawings());
    },
    fetchDocuments: (HierarchyType, floorID) => {
        dispatch(fetchDocuments(HierarchyType, floorID));
    },
    fetchClients: () => {
        dispatch(fetchClients());
    },
    fetchAllCompanies: () => {
        dispatch(fetchAllCompanies());
    },
    fetchPinStatsForLevel: (hierarchyType, levelID) => {
        dispatch(fetchPinStatsForLevel(hierarchyType, levelID));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleFloorContainer);

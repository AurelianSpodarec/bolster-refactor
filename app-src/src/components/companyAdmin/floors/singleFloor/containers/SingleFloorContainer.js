import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchSingleFloor from 'actions/companyAdmin/floors/async/fetchSingleFloor';
import fetchAllDrawings from 'actions/companyAdmin/drawings/async/fetchAllDrawings';
import fetchDocuments from 'actions/companyAdmin/documents/async/fetchDocuments';
import fetchClients from 'actions/companyAdmin/clients/async/fetchClients';
import fetchAllCompanies from 'actions/companyAdmin/companies/async/fetchAllCompanies';
import fetchOperatives from 'actions/companyAdmin/operatives/async/fetchOperatives';

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
            fetchClients,
            fetchAllCompanies,
            fetchOperatives
        } = this.props;

        fetchSingleFloor(floorID);
        fetchAllDrawings();
        fetchDocuments('floor', floorID);
        fetchClients();
        fetchAllCompanies();
        fetchOperatives();
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
    fetchDocuments: (HierachyType, floorID) => {
        dispatch(fetchDocuments(HierachyType, floorID));
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
    mapStateToProps,
    mapDispatchToProps
)(SingleFloorContainer);

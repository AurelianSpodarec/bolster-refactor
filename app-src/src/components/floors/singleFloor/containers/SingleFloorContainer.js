import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchSingleFloor from 'actions/floors/async/fetchSingleFloor';
import fetchAllDrawings from 'actions/drawings/async/fetchAllDrawings';
import fetchDocuments from 'actions/documents/async/fetchDocuments';
import fetchClients from 'actions/clients/async/fetchClients';
import fetchCompanies from 'actions/companies/async/fetchCompanies';
import fetchOperatives from 'actions/operatives/async/fetchOperatives';

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
            fetchCompanies,
            fetchOperatives
        } = this.props;

        fetchSingleFloor(floorID);
        fetchAllDrawings();
        fetchDocuments();
        fetchClients();
        fetchCompanies();
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
    mapStateToProps,
    mapDispatchToProps
)(SingleFloorContainer);

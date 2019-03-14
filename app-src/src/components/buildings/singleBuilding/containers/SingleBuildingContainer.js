import React, { Component } from 'react';
import { connect } from 'react-router-dom';

import fetchSingleBuilding from 'actions/buildings/async/fetchSingleBuilding';
import fetchDocuments from 'actions/documents/async/fetchDocuments';
import fetchClients from 'actions/clients/async/fetchClients';
import fetchCompanies from 'actions/companies/async/fetchCompanies';
import fetchOperatives from 'actions/operatives/async/fetchOperatives';

import SingleBuilding from '../presentational/SingleBuilding';

class SingleBuildingContainer extends Component {
    render() {
        return <SingleBuilding />;
    }

    componentDidMount = () => {
        const { fetchSingleBuilding, fetchDocuments } = this.props;
        fetchSingleBuilding();
        fetchDocuments();
        fetchClients();
        fetchCompanies();
        fetchOperatives();
    };
}

const mapDispatchToProps = dispatch => ({
    fetchSingleBuilding: () => {
        dispatch(fetchSingleBuilding());
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
    null,
    mapDispatchToProps
)(SingleBuildingContainer);

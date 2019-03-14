import React, { Component } from 'react';
import { connect } from 'react-router-dom';

import fetchSingleBuilding from 'actions/buildings/async/fetchSingleBuilding';
import fetchDocuments from 'actions/documents/async/fetchDocuments';

import BuildingDetailsContainer from '../containers/BuildingDetailsContainer';
import DocumentsTableContainer from '../containers/DocumentsTableContainer';
import FloorsTableContainer from '../containers/FloorsTableContainer';
import OperativesTableContainer from '../containers/OperativesTableContainer';
import ClientsTableContainer from '../containers/ClientsTableContainer';
import CompaniesAccessTableContainer from '../containers/CompaniesAccessTableContainer';

class SingleBuildingContainer extends Component {
    render() {
        return (
            <div className="size-lg-12">
                <BuildingDetailsContainer />

                <DocumentsTableContainer />

                <FloorsTableContainer />

                <ClientsTableContainer />

                <OperativesTableContainer />

                <CompaniesAccessTableContainer />
            </div>
        );
    }

    componentDidMount = () => {
        const { fetchSingleBuilding } = this.props;
        fetchSingleBuilding();
    };
}

const mapDispatchToProps = dispatch => ({
    fetchSingleBuilding: () => {
        dispatch(fetchSingleBuilding());
    },
    fetchDocuments: () => {
        dispatch(fetchDocuments());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(SingleBuildingContainer);

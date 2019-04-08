import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchAllBuildings from 'actions/companyAdmin/buildings/async/fetchAllBuildings';
import fetchAllFloors from 'actions/companyAdmin/floors/async/fetchAllFloors';
import fetchAllDrawings from 'actions/companyAdmin/drawings/async/fetchAllDrawings';
import fetchSingleSite from 'actions/companyAdmin/sites/async/fetchSingleSite';
import fetchDocuments from 'actions/companyAdmin/creditLogs/documents/async/fetchDocuments';
import fetchClients from 'actions/companyAdmin/clients/async/fetchClients';
import fetchAllCompanies from 'actions/companyAdmin/companies/async/fetchAllCompanies';
import fetchPinStatsForLevel from 'actions/companyAdmin/stats/async/fetchPinStatsForLevel';

import SingleSite from '../presentational/SingleSite';

class SingleSiteContainer extends Component {
    render() {
        return <SingleSite />;
    }
    componentDidMount = () => {
        const {
            siteID,
            fetchSingleSite,
            fetchAllBuildings,
            fetchAllFloors,
            fetchAllDrawings,
            fetchDocuments,
            // fetchClients,
            fetchAllCompanies,
            fetchPinStatsForLevel
        } = this.props;
        fetchSingleSite(siteID).then(() => {
            fetchDocuments('site', siteID);
            fetchPinStatsForLevel('site', siteID);
            fetchAllBuildings();
            fetchAllFloors();
            fetchAllDrawings();
            // fetchClients();
            fetchAllCompanies();
        });
    };
}

//make all fetches needed and this will update our redux store.
const mapDispatchToProps = dispatch => ({
    fetchAllBuildings: () => {
        dispatch(fetchAllBuildings());
    },
    fetchAllDrawings: () => {
        dispatch(fetchAllDrawings());
    },
    fetchAllFloors: () => {
        dispatch(fetchAllFloors());
    },
    fetchSingleSite: siteID => {
        return dispatch(fetchSingleSite(siteID));
    },
    fetchDocuments: (HierarchyType, siteID) => {
        dispatch(fetchDocuments(HierarchyType, siteID));
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
    (_, { match }) => ({ siteID: match.params['id'] }),
    mapDispatchToProps
)(SingleSiteContainer);

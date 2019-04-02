import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchAllBuildings from 'actions/companyAdmin/buildings/async/fetchAllBuildings';
import fetchAllFloors from 'actions/companyAdmin/floors/async/fetchAllFloors';
import fetchAllDrawings from 'actions/companyAdmin/drawings/async/fetchAllDrawings';
import fetchSingleSite from 'actions/companyAdmin/sites/async/fetchSingleSite';
import fetchDocuments from 'actions/companyAdmin/documents/async/fetchDocuments';
import fetchClients from 'actions/companyAdmin/clients/async/fetchClients';
import fetchAllCompanies from 'actions/companyAdmin/companies/async/fetchAllCompanies';
import fetchOperatives from 'actions/companyAdmin/operatives/async/fetchOperatives';

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
            fetchClients,
            fetchAllCompanies,
            fetchOperatives
        } = this.props;

        console.log('mounted');

        fetchSingleSite(siteID).then(() => {
            fetchAllBuildings();
            fetchAllFloors();
            fetchAllDrawings();
            fetchDocuments('site', siteID);
            fetchClients();
            fetchAllCompanies();
            fetchOperatives();
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
    fetchDocuments: (HierachyType, siteID) => {
        dispatch(fetchDocuments(HierachyType, siteID));
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
    (_, { match }) => ({ siteID: match.params['id'] }),
    mapDispatchToProps
)(SingleSiteContainer);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchAllBuildings from 'actions/buildings/async/fetchAllBuildings';
import fetchAllFloors from 'actions/floors/async/fetchAllFloors';
import fetchAllDrawings from 'actions/drawings/async/fetchAllDrawings';
import fetchSingleSite from 'actions/sites/async/fetchSingleSite';
import fetchDocuments from 'actions/documents/async/fetchDocuments';
import fetchClients from 'actions/clients/async/fetchClients';
import fetchAllCompanies from 'actions/companies/async/fetchAllCompanies';
import fetchOperatives from 'actions/operatives/async/fetchOperatives';

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

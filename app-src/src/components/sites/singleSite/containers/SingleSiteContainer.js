import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchAllBuildings from 'actions/buildings/async/fetchAllBuildings';
import fetchSingleSite from 'actions/sites/async/fetchSingleSite';
import fetchDocuments from 'actions/documents/async/fetchDocuments';
import fetchClients from 'actions/clients/async/fetchClients';
import fetchCompanies from 'actions/companies/async/fetchCompanies';
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
            fetchDocuments,
            fetchClients,
            fetchCompanies,
            fetchOperatives
        } = this.props;

        fetchSingleSite(siteID);
        fetchAllBuildings();
        fetchDocuments();
        fetchClients();
        fetchCompanies();
        fetchOperatives();
    };
}

//make all fetches needed and this will update our redux store.
const mapDispatchToProps = dispatch => ({
    fetchAllBuildings: () => {
        dispatch(fetchAllBuildings());
    },
    fetchSingleSite: siteID => {
        dispatch(fetchSingleSite(siteID));
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
    (_, { match }) => ({ siteID: match.params['id'] }),
    mapDispatchToProps
)(SingleSiteContainer);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchAllBuildings from 'actions/companyAdmin/buildings/async/fetchAllBuildings';
import fetchAllFloors from 'actions/companyAdmin/floors/async/fetchAllFloors';
import fetchAllDrawings from 'actions/companyAdmin/drawings/async/fetchAllDrawings';
import fetchSingleSite from 'actions/companyAdmin/sites/async/fetchSingleSite';
import fetchDocuments from 'actions/documents/async/fetchDocuments';
import fetchPinStatsForLevel from 'actions/companyAdmin/stats/async/fetchPinStatsForLevel';

import SingleSite from '../presentational/SingleSite';

class SingleSiteContainer extends Component {
    render = () => <SingleSite />;

    componentDidMount = () => {
        const { siteID, fetchSiteData } = this.props;
        fetchSiteData(siteID);
    };
}

//make all fetches needed and this will update our redux store.
const mapDispatchToProps = dispatch => ({
    fetchSiteData: siteID => {
        const hierarchyType = 'site';
        dispatch(fetchSingleSite(siteID));
        dispatch(fetchAllBuildings());
        dispatch(fetchAllDrawings());
        dispatch(fetchAllFloors());
        dispatch(fetchDocuments(hierarchyType, siteID));
        dispatch(fetchPinStatsForLevel(hierarchyType, siteID));
    }
});

export default connect(
    (_, { match }) => ({ siteID: match.params['id'] }),
    mapDispatchToProps
)(SingleSiteContainer);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchAllClientBuildings from 'actions/client/buildings/async/clientFetchAllBuildings';
import fetchAllClientFloors from 'actions/client/floors/async/clientFetchAllFloors';
import fetchAllClientDrawings from 'actions/client/drawings/async/clientFetchAllDrawings';
import fetchSingleClientSite from 'actions/client/sites/async/clientFetchSingleSite';
import fetchClientPinStatsForLevel from 'actions/client/stats/async/fetchClientPinStatsForLevel';

import SingleSite from '../presentational/SingleSite';

import { getSelectedCompanyForClient } from 'helpers/generic';

class SingleSiteContainer extends Component {
    render = () => <SingleSite />;

    componentDidMount = () => {
        const { siteID, fetchSiteData } = this.props;
        const selectedCompanyID = getSelectedCompanyForClient();

        fetchSiteData(selectedCompanyID, siteID);
    };
}

//make all fetches needed and this will update our redux store.
const mapDispatchToProps = dispatch => ({
    fetchSiteData: (selectedCompanyID, siteID) => {
        const hierarchyType = 'site';
        dispatch(fetchSingleClientSite(selectedCompanyID, siteID));
        dispatch(fetchAllClientBuildings(selectedCompanyID));
        dispatch(fetchAllClientDrawings(selectedCompanyID));
        dispatch(fetchAllClientFloors(selectedCompanyID));
        dispatch(
            fetchClientPinStatsForLevel(
                selectedCompanyID,
                hierarchyType,
                siteID
            )
        );
    }
});

export default connect(
    (_, { match }) => ({ siteID: match.params['id'] }),
    mapDispatchToProps
)(SingleSiteContainer);

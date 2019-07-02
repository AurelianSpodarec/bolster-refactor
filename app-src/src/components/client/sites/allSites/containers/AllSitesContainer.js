import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchAllClientSites from 'actions/client/sites/async/clientFetchAllSites';
import fetchAllClientBuildings from 'actions/client/buildings/async/clientFetchAllBuildings';
import fetchAllClientFloors from 'actions/client/floors/async/clientFetchAllFloors';
import fetchAllClientDrawings from 'actions/client/drawings/async/clientFetchAllDrawings';

import AllSites from '../presentational/AllSites';

import { getSelectedCompanyForClient } from 'helpers/generic';

class AllSitesContainer extends Component {
    render() {
        return <AllSites />;
    }

    componentDidMount = () => {
        const { fetchAllLevels } = this.props;

        const selectedCompanyID = getSelectedCompanyForClient();

        fetchAllLevels(selectedCompanyID);
    };
}

export default connect(
    null,
    dispatch => ({
        fetchAllLevels: companyID => {
            dispatch(fetchAllClientSites(companyID));
            dispatch(fetchAllClientBuildings(companyID));
            dispatch(fetchAllClientFloors(companyID));
            dispatch(fetchAllClientDrawings(companyID));
        }
    })
)(AllSitesContainer);

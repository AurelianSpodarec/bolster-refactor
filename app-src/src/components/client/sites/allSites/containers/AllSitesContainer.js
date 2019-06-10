import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchAllClientSites from 'actions/client/sites/async/clientFetchAllSites';
import fetchAllClientBuildings from 'actions/client/buildings/async/clientFetchAllBuildings';
import fetchAllClientFloors from 'actions/client/floors/async/clientFetchAllFloors';
import fetchAllClientDrawings from 'actions/client/drawings/async/clientFetchAllDrawings';

import AllSites from '../presentational/AllSites';

class AllSitesContainer extends Component {
    render() {
        return <AllSites />;
    }

    componentDidMount = () => {
        const {
            fetchAllClientSites,
            fetchAllClientBuildings,
            fetchAllClientFloors,
            fetchAllClientDrawings
        } = this.props;

        const selectedCompanyID = parseInt(
            localStorage.getItem('selectedCompany')
        );

        fetchAllClientSites(selectedCompanyID);
        fetchAllClientBuildings(selectedCompanyID);
        fetchAllClientFloors(selectedCompanyID);
        fetchAllClientDrawings(selectedCompanyID);
    };
}

export default connect(
    null,
    dispatch => ({
        fetchAllClientSites: companyID => {
            dispatch(fetchAllClientSites(companyID));
        },
        fetchAllClientBuildings: companyID => {
            dispatch(fetchAllClientBuildings(companyID));
        },
        fetchAllClientFloors: companyID => {
            dispatch(fetchAllClientFloors(companyID));
        },
        fetchAllClientDrawings: companyID => {
            dispatch(fetchAllClientDrawings(companyID));
        }
    })
)(AllSitesContainer);

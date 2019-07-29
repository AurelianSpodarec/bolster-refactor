import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchAllClientSites from 'actions/client/sites/async/clientFetchAllSites';
import fetchAllClientBuildings from 'actions/client/buildings/async/clientFetchAllBuildings';
import fetchAllClientFloors from 'actions/client/floors/async/clientFetchAllFloors';
import fetchAllClientDrawings from 'actions/client/drawings/async/clientFetchAllDrawings';

import CreateReport from '../presentational/CreateReport';
import { getSelectedCompanyForClient } from 'helpers/generic';
import clientFetchHistoricServices from 'actions/client/services/async/clientFetchHistoricServices';

export class CreateReportContainer extends Component {
    render = () => <CreateReport />;

    componentDidMount = () => {
        const selectedCompanyID = getSelectedCompanyForClient();

        this.props.fetchAll(selectedCompanyID);
    };
}

const mapDispatchToProps = dispatch => ({
    fetchAll: companyID => {
        dispatch(fetchAllClientSites(companyID));
        dispatch(fetchAllClientBuildings(companyID));
        dispatch(fetchAllClientFloors(companyID));
        dispatch(fetchAllClientDrawings(companyID));
        dispatch(clientFetchHistoricServices(companyID));
    }
});

export default connect(
    null,
    mapDispatchToProps
)(CreateReportContainer);

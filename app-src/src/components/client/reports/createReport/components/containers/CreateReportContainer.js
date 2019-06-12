import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchAllClientSites from 'actions/client/sites/async/clientFetchAllSites';
import fetchAllClientBuildings from 'actions/client/buildings/async/clientFetchAllBuildings';
import fetchAllClientFloors from 'actions/client/floors/async/clientFetchAllFloors';
import fetchAllClientDrawings from 'actions/client/drawings/async/clientFetchAllDrawings';

import CreateReport from '../presentational/CreateReport';
import { getSelectedCompanyForClient } from 'helpers/generic';

export class CreateReportContainer extends Component {
    render = () => <CreateReport />;

    componentDidMount = () => {
        const selectedCompanyID = getSelectedCompanyForClient();

        this.props.fetchAllLevels(selectedCompanyID);
    };
}

const mapDispatchToProps = dispatch => ({
    fetchAllLevels: companyID => {
        dispatch(fetchAllClientSites(companyID));
        dispatch(fetchAllClientBuildings(companyID));
        dispatch(fetchAllClientFloors(companyID));
        dispatch(fetchAllClientDrawings(companyID));
    }
});

export default connect(
    null,
    mapDispatchToProps
)(CreateReportContainer);

import React from 'react';
import { connect } from 'react-redux';

import fetchAllClientSites from 'actions/client/sites/async/clientFetchAllSites';
import fetchAllClientBuildings from 'actions/client/buildings/async/clientFetchAllBuildings';
import fetchAllClientFloors from 'actions/client/floors/async/clientFetchAllFloors';
import fetchAllClientDrawings from 'actions/client/drawings/async/clientFetchAllDrawings';
import resetFilterOptions from 'actions/companyAdmin/reports/sync/resetFilterOptions';

import CreateReport from '../presentational/CreateReport';

import {
    getSelectedCompanyForClient,
    componentDidMount,
    componentWillUnmount,
} from 'helpers/generic';

const CreateReportContainer = ({ fetchAll, resetFilterOptions }) => {
    const selectedCompanyID = getSelectedCompanyForClient();
    componentDidMount(() => {
        fetchAll(selectedCompanyID);
    });
    componentWillUnmount(resetFilterOptions);

    return <CreateReport />;
};

const mapDispatchToProps = dispatch => ({
    fetchAll: companyID => {
        dispatch(fetchAllClientSites(companyID));
        dispatch(fetchAllClientBuildings(companyID));
        dispatch(fetchAllClientFloors(companyID));
        dispatch(fetchAllClientDrawings(companyID));
    },
    resetFilterOptions: () => resetFilterOptions(),
});

export default connect(null, mapDispatchToProps)(CreateReportContainer);

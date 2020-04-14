import React from 'react';
import { connect } from 'react-redux';

import fetchAllSites from 'actions/companyAdmin/sites/async/fetchAllSites';
import fetchAllBuildings from 'actions/companyAdmin/buildings/async/fetchAllBuildings';
import fetchAllFloors from 'actions/companyAdmin/floors/async/fetchAllFloors';
import fetchAllDrawings from 'actions/companyAdmin/drawings/async/fetchAllDrawings';

import CreateReport from '../presentational/CreateReport';
import fetchCompanyOperatives from 'actions/companyAdmin/operatives/async/fetchCompanyOperatives';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';
import { componentDidMount, componentWillUnmount } from 'helpers/generic';
import fetchHistoricServicesForCompany from 'actions/companyAdmin/services/async/fetchHistoricServicesForCompany';
import resetFilterOptions from 'actions/companyAdmin/reports/sync/resetFilterOptions';

const CreateReportContainer = ({ fetchAll, resetFilterOptions }) => {
    componentDidMount(fetchAll);
    componentWillUnmount(resetFilterOptions);

    return <CreateReport />;
};

const mapDispatchToProps = dispatch => ({
    fetchAll: () => {
        dispatch(fetchAllSites());
        dispatch(fetchAllBuildings());
        dispatch(fetchAllFloors());
        dispatch(fetchAllDrawings());
        dispatch(fetchCompanyOperatives());
        dispatch(fetchCompanyUsers());
        dispatch(fetchHistoricServicesForCompany());
    },
    resetFilterOptions: () => dispatch(resetFilterOptions()),
});

export default connect(null, mapDispatchToProps)(CreateReportContainer);

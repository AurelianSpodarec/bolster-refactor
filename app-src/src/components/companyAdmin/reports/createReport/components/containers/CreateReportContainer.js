import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchAllSites from 'actions/companyAdmin/sites/async/fetchAllSites';
import fetchAllBuildings from 'actions/companyAdmin/buildings/async/fetchAllBuildings';
import fetchAllFloors from 'actions/companyAdmin/floors/async/fetchAllFloors';
import fetchAllDrawings from 'actions/companyAdmin/drawings/async/fetchAllDrawings';

import CreateReport from '../presentational/CreateReport';
import fetchAllTemplates from 'actions/companyAdmin/templates/async/fetchAllTemplates';

export class CreateReportContainer extends Component {
    render = () => <CreateReport />;

    componentDidMount = () => {
        const { fetchAllLevels, fetchAllTemplates } = this.props;

        fetchAllLevels();
        fetchAllTemplates();
    };
}

const mapDispatchToProps = dispatch => ({
    fetchAllLevels: () => {
        dispatch(fetchAllSites());
        dispatch(fetchAllBuildings());
        dispatch(fetchAllFloors());
        dispatch(fetchAllDrawings());
    },
    fetchAllTemplates: () => dispatch(fetchAllTemplates())
});

export default connect(
    null,
    mapDispatchToProps
)(CreateReportContainer);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { DRAWING_TABS } from 'constants/shared/tabNames';
import setTabs from 'actions/shared/generic/tabs/sync/setTabs';

import SingleDrawing from '../presentational/SingleDrawing';

import fetchSingleDrawing from 'actions/companyAdmin/drawings/async/fetchSingleDrawing';
import fetchDocuments from 'actions/documents/async/fetchDocuments';
import fetchPins from 'actions/companyAdmin/pins/async/fetchPins';
import fetchClientsForDrawing from 'actions/companyAdmin/clients/async/fetchClientsForDrawing';
import fetchOperativesForDrawing from 'actions/companyAdmin/operatives/async/fetchOperativesForDrawing';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';
import resetFilterOptions from 'actions/companyAdmin/reports/sync/resetFilterOptions';
import fetchPinStatsForLevel from 'actions/companyAdmin/stats/async/fetchPinStatsForLevel';
import fetchHistoricServicesForCompany from 'actions/companyAdmin/services/async/fetchHistoricServicesForCompany';

class SingleDrawingContainer extends Component {
    render = () => <SingleDrawing />;

    componentDidMount = () => {
        const { drawingID, setTabs, fetchDrawingData } = this.props;
        setTabs(Object.values(DRAWING_TABS), DRAWING_TABS.GENERAL_OVERVIEW);
        fetchDrawingData(drawingID);
    };

    // removes filters from redux store from selecting on single drawing page to pass through to advanced report
    // if you leave the single drawing screen without going through advanced report
    componentWillUnmount = () => this.props.resetFilterOptions();
}

const mapDispatchToProps = dispatch => ({
    setTabs: (tabs, selectedTab) => dispatch(setTabs(tabs, selectedTab)),
    fetchDrawingData: drawingID => {
        dispatch(fetchSingleDrawing(drawingID));
        dispatch(fetchDocuments('drawing', drawingID));
        dispatch(fetchClientsForDrawing(drawingID));
        dispatch(fetchOperativesForDrawing(drawingID));
        dispatch(fetchPins('drawing', drawingID));
        dispatch(fetchCompanyUsers());
        dispatch(fetchPinStatsForLevel(4, drawingID));
        dispatch(fetchHistoricServicesForCompany());
    },
    resetFilterOptions: () => dispatch(resetFilterOptions())
});

export default connect(
    (_, { match }) => ({ drawingID: match.params.id }),
    mapDispatchToProps
)(SingleDrawingContainer);

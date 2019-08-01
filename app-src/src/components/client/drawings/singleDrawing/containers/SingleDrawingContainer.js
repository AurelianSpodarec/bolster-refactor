import React, { Component } from 'react';
import { connect } from 'react-redux';

import { DRAWING_TABS } from 'constants/shared/tabNames';
import setTabs from 'actions/shared/generic/tabs/sync/setTabs';

import fetchSingleClientDrawing from 'actions/client/drawings/async/clientFetchSingleDrawing';
import fetchClientPins from 'actions/client/pins/async/clientFetchPins';
import clientFetchDocuments from 'actions/client/documents/async/clientFetchDocuments';

import SingleDrawing from '../presentational/SingleDrawing';
import { getSelectedCompanyForClient } from 'helpers/generic';
import fetchClientPinStatsForLevel from 'actions/client/stats/async/fetchClientPinStatsForLevel';
import clientResetFilterOptions from 'actions/client/reports/create/sync/clientResetFilterOptions';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';

class SingleDrawingContainer extends Component {
    render = () => <SingleDrawing />;

    componentDidMount = () => {
        const { drawingID, setTabs, fetchDrawingData } = this.props;
        setTabs(Object.values(DRAWING_TABS), DRAWING_TABS.GENERAL_OVERVIEW);
        const selectedCompanyID = getSelectedCompanyForClient();

        fetchDrawingData(selectedCompanyID, drawingID);
    };
    componentWillUnmount = () => this.props.resetFilterOptions();
}

const mapDispatchToProps = dispatch => ({
    setTabs: (tabs, selectedTab) => dispatch(setTabs(tabs, selectedTab)),
    fetchDrawingData: (companyID, drawingID) => {
        dispatch(fetchSingleClientDrawing(companyID, drawingID));
        dispatch(fetchClientPins(companyID, drawingID));
        dispatch(clientFetchDocuments(companyID, 'drawing', drawingID));
        dispatch(fetchClientPinStatsForLevel(companyID, 4, drawingID));
        dispatch(fetchCompanyUsers());
    },
    resetFilterOptions: () => dispatch(clientResetFilterOptions())
});

export default connect(
    (_, { match }) => ({ drawingID: match.params.id }),
    mapDispatchToProps
)(SingleDrawingContainer);

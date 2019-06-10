import React, { Component } from 'react';
import { connect } from 'react-redux';

import { DRAWING_TABS } from 'constants/shared/tabNames';
import setTabs from 'actions/shared/generic/tabs/sync/setTabs';

import fetchSingleClientDrawing from 'actions/client/drawings/async/clientFetchSingleDrawing';
import fetchClientPins from 'actions/client/pins/async/clientFetchPins';
import fetchClientDrawingOperatives from 'actions/client/drawings/async/clientFetchDrawingOperatives';
import clientFetchDocuments from 'actions/client/documents/async/clientFetchDocuments';

import SingleDrawing from '../presentational/SingleDrawing';
import { getSelectedCompanyForClient } from 'helpers/generic';

class SingleDrawingContainer extends Component {
    render = () => <SingleDrawing />;

    componentDidMount = () => {
        const { drawingID, setTabs, fetchDrawingData } = this.props;
        setTabs(Object.values(DRAWING_TABS), DRAWING_TABS.GENERAL_OVERVIEW);
        const selectedCompanyID = getSelectedCompanyForClient();

        fetchDrawingData(selectedCompanyID, drawingID);
    };
}

const mapDispatchToProps = dispatch => ({
    setTabs: (tabs, selectedTab) => dispatch(setTabs(tabs, selectedTab)),
    fetchDrawingData: (companyID, drawingID) => {
        dispatch(fetchSingleClientDrawing(companyID, drawingID));
        dispatch(fetchClientPins(companyID, drawingID));
        dispatch(fetchClientDrawingOperatives(companyID, drawingID));
        dispatch(clientFetchDocuments(companyID, 'drawing', drawingID));
    }
});

export default connect(
    (_, { match }) => ({ drawingID: match.params.id }),
    mapDispatchToProps
)(SingleDrawingContainer);

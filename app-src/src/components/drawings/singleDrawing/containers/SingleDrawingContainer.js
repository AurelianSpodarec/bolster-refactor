import React, { Component } from 'react';
import { connect } from 'react-redux';

import { DRAWING_TABS } from 'constants/tabNames';
import setTabs from 'actions/generic/tabs/sync/setTabs';

import SingleDrawing from '../presentational/SingleDrawing';

import fetchSingleDrawing from 'actions/drawings/async/fetchSingleDrawing';
import fetchDocuments from 'actions/documents/async/fetchDocuments';
import fetchClients from 'actions/companies/async/fetchAllCompanies';
import fetchAllCompanies from 'actions/companies/async/fetchAllCompanies';
import fetchOperatives from 'actions/operatives/async/fetchOperatives';
import fetchPins from 'actions/pins/async/fetchPins';

class SingleDrawingContainer extends Component {
    render() {
        return <SingleDrawing />;
    }

    componentDidMount = () => {
        const {
            drawingID,
            setTabs,
            fetchSingleDrawing,
            fetchDocuments,
            fetchClients,
            fetchAllCompanies,
            fetchOperatives,
            fetchPins
        } = this.props;

        setTabs(Object.values(DRAWING_TABS), DRAWING_TABS.GENERAL_OVERVIEW);

        fetchSingleDrawing(drawingID);
        fetchDocuments();
        fetchClients();
        fetchAllCompanies();
        fetchOperatives();
        fetchPins();
    };
}

const mapDispatchToProps = dispatch => ({
    setTabs: (tabs, selectedTab) => {
        dispatch(setTabs(tabs, selectedTab));
    },
    fetchSingleDrawing: drawingID => {
        dispatch(fetchSingleDrawing(drawingID));
    },
    fetchDocuments: () => {
        dispatch(fetchDocuments());
    },
    fetchClients: () => {
        dispatch(fetchClients());
    },
    fetchAllCompanies: () => {
        dispatch(fetchAllCompanies());
    },
    fetchOperatives: () => {
        dispatch(fetchOperatives());
    },
    fetchPins: () => {
        dispatch(fetchPins());
    }
});

export default connect(
    (_, { match }) => ({ drawingID: match.params['id'] }),
    mapDispatchToProps
)(SingleDrawingContainer);

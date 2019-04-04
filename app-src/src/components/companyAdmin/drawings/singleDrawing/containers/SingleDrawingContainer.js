import React, { Component } from 'react';
import { connect } from 'react-redux';

import { DRAWING_TABS } from 'constants/shared/tabNames';
import setTabs from 'actions/shared/generic/tabs/sync/setTabs';

import SingleDrawing from '../presentational/SingleDrawing';

import fetchSingleDrawing from 'actions/companyAdmin/drawings/async/fetchSingleDrawing';
import fetchDocuments from 'actions/companyAdmin/documents/async/fetchDocuments';
import fetchAllCompanies from 'actions/companyAdmin/companies/async/fetchAllCompanies';
import fetchOperatives from 'actions/companyAdmin/operatives/async/fetchOperatives';
import fetchPins from 'actions/companyAdmin/pins/async/fetchPins';
import fetchClientsForDrawing from 'actions/companyAdmin/clients/async/fetchClientsForDrawing';

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
            fetchAllCompanies,
            fetchOperatives,
            fetchPins,
            fetchClientsForDrawing
        } = this.props;

        setTabs(Object.values(DRAWING_TABS), DRAWING_TABS.GENERAL_OVERVIEW);

        fetchSingleDrawing(drawingID);
        fetchDocuments('drawing', drawingID);
        fetchAllCompanies();
        fetchOperatives();
        fetchPins();
        fetchClientsForDrawing(drawingID);
    };
}

const mapDispatchToProps = dispatch => ({
    setTabs: (tabs, selectedTab) => {
        dispatch(setTabs(tabs, selectedTab));
    },
    fetchSingleDrawing: drawingID => {
        dispatch(fetchSingleDrawing(drawingID));
    },
    fetchDocuments: (HierarchyType, drawingID) => {
        dispatch(fetchDocuments(HierarchyType, drawingID));
    },
    fetchClientsForDrawing: drawingID => {
        dispatch(fetchClientsForDrawing(drawingID));
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

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { DRAWING_TABS } from 'constants/tabNames';
import setTabs from 'actions/generic/tabs/sync/setTabs';

import SingleDrawing from '../presentational/SingleDrawing';

import fetchDocuments from 'actions/documents/async/fetchDocuments';
import fetchClients from 'actions/clients/async/fetchClients';
import fetchCompanies from 'actions/companies/async/fetchCompanies';
import fetchOperatives from 'actions/operatives/async/fetchOperatives';
import fetchPins from 'actions/pins/async/fetchPins';

class SingleDrawingContainer extends Component {
    render() {
        return <SingleDrawing />;
    }

    componentDidMount = () => {
        const {
            setTabs,
            fetchDocuments,
            fetchClients,
            fetchCompanies,
            fetchOperatives,
            fetchPins
        } = this.props;

        setTabs(Object.values(DRAWING_TABS), DRAWING_TABS.GENERAL_OVERVIEW);

        fetchDocuments();
        fetchClients();
        fetchCompanies();
        fetchOperatives();
        fetchPins();
    };
}

const mapDispatchToProps = dispatch => ({
    setTabs: (tabs, selectedTab) => {
        dispatch(setTabs(tabs, selectedTab));
    },
    fetchDocuments: () => {
        dispatch(fetchDocuments());
    },
    fetchClients: () => {
        dispatch(fetchClients());
    },
    fetchCompanies: () => {
        dispatch(fetchCompanies());
    },
    fetchOperatives: () => {
        dispatch(fetchOperatives());
    },
    fetchPins: () => {
        dispatch(fetchPins());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(SingleDrawingContainer);

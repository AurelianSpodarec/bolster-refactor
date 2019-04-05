import React, { Component } from 'react';
import { connect } from 'react-redux';

import { DRAWING_TABS } from 'constants/shared/tabNames';
import setTabs from 'actions/shared/generic/tabs/sync/setTabs';

import SingleDrawing from '../presentational/SingleDrawing';

import fetchSingleDrawing from 'actions/companyAdmin/drawings/async/fetchSingleDrawing';
import fetchDocuments from 'actions/companyAdmin/documents/async/fetchDocuments';
import fetchAllCompanies from 'actions/companyAdmin/companies/async/fetchAllCompanies';
import fetchPins from 'actions/companyAdmin/pins/async/fetchPins';
import fetchClientsForDrawing from 'actions/companyAdmin/clients/async/fetchClientsForDrawing';
import fetchOperativesForDrawing from 'actions/companyAdmin/operatives/async/fetchOperativesForDrawing';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';

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
            fetchOperativesForDrawing,
            fetchPins,
            fetchClientsForDrawing,
            fetchAllCompanyUsers
        } = this.props;
        setTabs(Object.values(DRAWING_TABS), DRAWING_TABS.GENERAL_OVERVIEW);
        fetchSingleDrawing(drawingID);
        fetchDocuments('drawing', drawingID);
        fetchAllCompanies();
        fetchOperativesForDrawing(drawingID);
        fetchPins('drawing', drawingID);
        fetchClientsForDrawing(drawingID);
        fetchAllCompanyUsers();
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
    fetchOperativesForDrawing: drawingID => {
        dispatch(fetchOperativesForDrawing(drawingID));
    },
    fetchPins: (type, id) => {
        dispatch(fetchPins(type, id));
    },
    fetchAllCompanyUsers: () => {
        dispatch(fetchCompanyUsers());
    }
});

export default connect(
    (_, { match }) => ({ drawingID: match.params['id'] }),
    mapDispatchToProps
)(SingleDrawingContainer);

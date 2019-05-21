import React, { Component } from 'react';
import { connect } from 'react-redux';

import { DRAWING_TABS } from 'constants/shared/tabNames';
import setTabs from 'actions/shared/generic/tabs/sync/setTabs';
import fetchSingleDrawing from 'actions/companyAdmin/drawings/async/fetchSingleDrawing';
import fetchPins from 'actions/companyAdmin/pins/async/fetchPins';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';

import SingleDrawing from '../presentational/SingleDrawing';

class SingleDrawingContainer extends Component {
    render = () => <SingleDrawing />;

    componentDidMount = () => {
        const { drawingID, setTabs, fetchDrawingData } = this.props;
        setTabs(Object.values(DRAWING_TABS), DRAWING_TABS.GENERAL_OVERVIEW);
        fetchDrawingData(drawingID);
    };
}

const mapDispatchToProps = dispatch => ({
    setTabs: (tabs, selectedTab) => dispatch(setTabs(tabs, selectedTab)),
    fetchDrawingData: drawingID => {
        dispatch(fetchSingleDrawing(drawingID));
        dispatch(fetchPins('drawing', drawingID));
        dispatch(fetchCompanyUsers());
    }
});

export default connect(
    (_, { match }) => ({ drawingID: match.params.id }),
    mapDispatchToProps
)(SingleDrawingContainer);
